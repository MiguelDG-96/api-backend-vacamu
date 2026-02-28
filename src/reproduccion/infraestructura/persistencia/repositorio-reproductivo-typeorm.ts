import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositorioReproductivo } from '../../dominio/puertos/repositorio-reproductivo';
import { Celo } from '../../dominio/entidades/celo';
import { Inseminacion } from '../../dominio/entidades/inseminacion';
import { Parto } from '../../dominio/entidades/parto';
import { CeloEntidad } from './celo.entidad';
import { InseminacionEntidad } from './inseminacion.entidad';
import { PartoEntidad } from './parto.entidad';

@Injectable()
export class RepositorioReproductivoTypeorm implements RepositorioReproductivo {
  constructor(
    @InjectRepository(CeloEntidad)
    private readonly repoCelo: Repository<CeloEntidad>,
    @InjectRepository(InseminacionEntidad)
    private readonly repoInseminacion: Repository<InseminacionEntidad>,
    @InjectRepository(PartoEntidad)
    private readonly repoParto: Repository<PartoEntidad>,
  ) {}

  async registrarCelo(modelo: Celo): Promise<Celo> {
    const entidad = new CeloEntidad();
    if (modelo.id) entidad.id = modelo.id;
    entidad.ganadoId = modelo.ganadoId;
    entidad.fechaInicio = modelo.fechaInicio;
    entidad.observaciones = modelo.observaciones || null as any;
    entidad.usuarioId = modelo.usuarioId;
    
    const guardado = await this.repoCelo.save(entidad);
    return new Celo(guardado.id, guardado.ganadoId, guardado.fechaInicio, guardado.observaciones || null, guardado.usuarioId, guardado.fechaRegistro);
  }

  async registrarInseminacion(modelo: Inseminacion): Promise<Inseminacion> {
    const entidad = new InseminacionEntidad();
    if (modelo.id) entidad.id = modelo.id;
    entidad.ganadoId = modelo.ganadoId;
    entidad.fechaInseminacion = modelo.fechaInseminacion;
    entidad.tipo = modelo.tipo;
    entidad.toroId = modelo.toroId || null as any;
    entidad.pajillaId = modelo.pajillaId || null as any;
    entidad.tecnico = modelo.tecnico || null as any;
    entidad.observaciones = modelo.observaciones || null as any;
    entidad.usuarioId = modelo.usuarioId;

    const guardado = await this.repoInseminacion.save(entidad);
    return new Inseminacion(guardado.id, guardado.ganadoId, guardado.fechaInseminacion, guardado.tipo as any, guardado.toroId || null, guardado.pajillaId || null, guardado.tecnico || null, guardado.observaciones || null, guardado.usuarioId, guardado.fechaRegistro);
  }

  async registrarParto(modelo: Parto): Promise<Parto> {
    const entidad = new PartoEntidad();
    if (modelo.id) entidad.id = modelo.id;
    entidad.ganadoId = modelo.ganadoId;
    entidad.fechaParto = modelo.fechaParto;
    entidad.tipoParto = modelo.tipoParto;
    entidad.criaId = modelo.criaId || null as any;
    entidad.estadoCria = modelo.estadoCria;
    entidad.observaciones = modelo.observaciones || null as any;
    entidad.usuarioId = modelo.usuarioId;

    const guardado = await this.repoParto.save(entidad);
    return new Parto(guardado.id, guardado.ganadoId, guardado.fechaParto, guardado.tipoParto as any, guardado.criaId || null, guardado.estadoCria as any, guardado.observaciones || null, guardado.usuarioId, guardado.fechaRegistro);
  }

  async obtenerHistorialReproductivo(ganadoId: string): Promise<any[]> {
    // Implementación simplificada
    return [];
  }
}
