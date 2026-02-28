import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositorioGanado } from '../../dominio/puertos/repositorio-ganado';
import { Ganado } from '../../dominio/entidades/ganado';
import { GanadoEntidad } from './ganado.entidad';

@Injectable()
export class RepositorioGanadoTypeorm implements RepositorioGanado {
  constructor(
    @InjectRepository(GanadoEntidad)
    private readonly repositorio: Repository<GanadoEntidad>,
  ) {}

  async guardar(animal: Ganado): Promise<Ganado> {
    const entidad = this.mapearAEntidad(animal);
    const guardada = await this.repositorio.save(entidad);
    return this.mapearADominio(guardada);
  }

  async buscarPorId(id: string): Promise<Ganado | null> {
    const entidad = await this.repositorio.findOne({ where: { id } });
    return entidad ? this.mapearADominio(entidad) : null;
  }

  async buscarPorIdentificacion(numero: string, usuarioId: string): Promise<Ganado | null> {
    const entidad = await this.repositorio.findOne({ where: { numeroIdentificacion: numero, usuarioId } });
    return entidad ? this.mapearADominio(entidad) : null;
  }

  async listarPorUsuario(usuarioId: string): Promise<Ganado[]> {
    const entidades = await this.repositorio.find({ where: { usuarioId } });
    return entidades.map(e => this.mapearADominio(e));
  }

  async buscarGenealogia(id: string): Promise<{ madre: Ganado | null; padre: Ganado | null }> {
    const entidad = await this.repositorio.findOne({ 
      where: { id },
      relations: ['madre', 'padre'],
    });
    
    if (!entidad) return { madre: null, padre: null };

    return {
      madre: entidad.madre ? this.mapearADominio(entidad.madre) : null,
      padre: entidad.padre ? this.mapearADominio(entidad.padre) : null,
    };
  }

  async contarTotal(): Promise<number> {
    return this.repositorio.count();
  }

  async eliminar(id: string): Promise<void> {
    await this.repositorio.delete(id);
  }

  private mapearADominio(entidad: GanadoEntidad): Ganado {
    return new Ganado(
      entidad.id,
      entidad.numeroIdentificacion,
      entidad.rfidTag || null,
      entidad.nombre || null,
      entidad.raza,
      entidad.sexo as any,
      entidad.fechaNacimiento,
      Number(entidad.pesoActual),
      entidad.estado as any,
      entidad.proposito as any,
      entidad.usuarioId,
      entidad.madreId || null,
      entidad.padreId || null,
      entidad.loteId || null,
      entidad.potreroId || null,
      entidad.fechaRegistro,
    );
  }

  private mapearAEntidad(modelo: Ganado): GanadoEntidad {
    const entidad = new GanadoEntidad();
    if (modelo.id) entidad.id = modelo.id;
    entidad.numeroIdentificacion = modelo.numeroIdentificacion;
    entidad.rfidTag = modelo.rfidTag;
    entidad.nombre = modelo.nombre;
    entidad.raza = modelo.raza;
    entidad.sexo = modelo.sexo;
    entidad.fechaNacimiento = modelo.fechaNacimiento;
    entidad.pesoActual = modelo.pesoActual;
    entidad.estado = modelo.estado;
    entidad.proposito = modelo.proposito;
    entidad.usuarioId = modelo.usuarioId;
    entidad.madreId = modelo.madreId;
    entidad.padreId = modelo.padreId;
    entidad.loteId = modelo.loteId;
    entidad.potreroId = modelo.potreroId;
    return entidad;
  }
}
