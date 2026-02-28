import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositorioSanitario } from '../../dominio/puertos/repositorio-sanitario';
import { Vacunacion } from '../../dominio/entidades/vacunacion';
import { Tratamiento } from '../../dominio/entidades/tratamiento';
import { VacunacionEntidad } from './vacunacion.entidad';
import { TratamientoEntidad } from './tratamiento.entidad';

@Injectable()
export class RepositorioSanitarioTypeorm implements RepositorioSanitario {
  constructor(
    @InjectRepository(VacunacionEntidad)
    private readonly repoVacunas: Repository<VacunacionEntidad>,
    @InjectRepository(TratamientoEntidad)
    private readonly repoTratamientos: Repository<TratamientoEntidad>,
  ) {}

  async guardarVacunacion(modelo: Vacunacion): Promise<Vacunacion> {
    const entidad = new VacunacionEntidad();
    if (modelo.id) entidad.id = modelo.id;
    entidad.ganadoId = modelo.ganadoId;
    entidad.nombreVacuna = modelo.nombreVacuna;
    entidad.fechaAplicacion = modelo.fechaAplicacion;
    entidad.fechaProximaDosis = modelo.fechaProximaDosis;
    entidad.lote = modelo.lote || null as any; // TypeORM nullable handling
    entidad.observaciones = modelo.observaciones || null as any;
    entidad.usuarioId = modelo.usuarioId;

    const guardada = await this.repoVacunas.save(entidad);
    return this.mapearVacunaADominio(guardada);
  }

  async obtenerVacunasPorAnimal(ganadoId: string): Promise<Vacunacion[]> {
    const entidades = await this.repoVacunas.find({ where: { ganadoId }, order: { fechaAplicacion: 'DESC' } });
    return entidades.map(e => this.mapearVacunaADominio(e));
  }

  async guardarTratamiento(modelo: Tratamiento): Promise<Tratamiento> {
    const entidad = new TratamientoEntidad();
    if (modelo.id) entidad.id = modelo.id;
    entidad.ganadoId = modelo.ganadoId;
    entidad.medicamento = modelo.medicamento;
    entidad.diagnostico = modelo.diagnostico || null as any;
    entidad.dosis = modelo.dosis;
    entidad.fechaInicio = modelo.fechaInicio;
    entidad.fechaFin = modelo.fechaFin;
    entidad.diasRetiroLeche = modelo.diasRetiroLeche;
    entidad.diasRetiroCarne = modelo.diasRetiroCarne;
    entidad.observaciones = modelo.observaciones || null as any;
    entidad.usuarioId = modelo.usuarioId;

    const guardada = await this.repoTratamientos.save(entidad);
    return this.mapearTratamientoADominio(guardada);
  }

  async obtenerTratamientosPorAnimal(ganadoId: string): Promise<Tratamiento[]> {
    const entidades = await this.repoTratamientos.find({ where: { ganadoId }, order: { fechaInicio: 'DESC' } });
    return entidades.map(e => this.mapearTratamientoADominio(e));
  }

  private mapearVacunaADominio(e: VacunacionEntidad): Vacunacion {
    return new Vacunacion(
      e.id,
      e.ganadoId,
      e.nombreVacuna,
      e.fechaAplicacion,
      e.fechaProximaDosis || null,
      e.lote || null,
      e.observaciones || null,
      e.usuarioId,
      e.fechaRegistro,
    );
  }

  private mapearTratamientoADominio(e: TratamientoEntidad): Tratamiento {
    return new Tratamiento(
      e.id,
      e.ganadoId,
      e.medicamento,
      e.diagnostico || null,
      e.dosis,
      e.fechaInicio,
      e.fechaFin || null,
      e.diasRetiroLeche,
      e.diasRetiroCarne,
      e.usuarioId,
      e.observaciones || null,
    );
  }
}
