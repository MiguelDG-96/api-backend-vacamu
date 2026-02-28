import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositorioProduccion } from '../../dominio/puertos/repositorio-produccion';
import { ProduccionLeche } from '../../dominio/entidades/produccion-leche';
import { Pesaje } from '../../dominio/entidades/pesaje';
import { ProduccionLecheEntidad } from './produccion-leche.entidad';
import { PesajeEntidad } from './pesaje.entidad';

@Injectable()
export class RepositorioProduccionTypeorm implements RepositorioProduccion {
  constructor(
    @InjectRepository(ProduccionLecheEntidad)
    private readonly repoLeche: Repository<ProduccionLecheEntidad>,
    @InjectRepository(PesajeEntidad)
    private readonly repoPesaje: Repository<PesajeEntidad>,
  ) {}

  async guardarProduccionLeche(modelo: ProduccionLeche): Promise<ProduccionLeche> {
    const entidad = new ProduccionLecheEntidad();
    if (modelo.id) entidad.id = modelo.id;
    entidad.ganadoId = modelo.ganadoId;
    entidad.fechaOrdene = modelo.fechaOrdene;
    entidad.jornada = modelo.jornada;
    entidad.litros = modelo.litros;
    entidad.calidad = modelo.calidad || null as any;
    entidad.observaciones = modelo.observaciones || null as any;
    entidad.usuarioId = modelo.usuarioId;

    const guardada = await this.repoLeche.save(entidad);
    return new ProduccionLeche(guardada.id, guardada.ganadoId, guardada.fechaOrdene, guardada.jornada as any, guardada.litros, guardada.calidad || null, guardada.usuarioId, guardada.observaciones || null, guardada.fechaRegistro);
  }

  async obtenerProduccionPorAnimal(ganadoId: string): Promise<ProduccionLeche[]> {
    const entidades = await this.repoLeche.find({ where: { ganadoId }, order: { fechaOrdene: 'DESC' } });
    return entidades.map(e => new ProduccionLeche(e.id, e.ganadoId, e.fechaOrdene, e.jornada as any, e.litros, e.calidad || null, e.usuarioId, e.observaciones || null, e.fechaRegistro));
  }

  async guardarPesaje(modelo: Pesaje): Promise<Pesaje> {
    const entidad = new PesajeEntidad();
    if (modelo.id) entidad.id = modelo.id;
    entidad.ganadoId = modelo.ganadoId;
    entidad.fechaPesaje = modelo.fechaPesaje;
    entidad.peso = modelo.peso;
    entidad.gananciaPeso = modelo.gananciaPeso || null as any;
    entidad.condicionCorporal = modelo.condicionCorporal || null as any;
    entidad.circunferenciaEscrotal = modelo.circunferenciaEscrotal || null as any;
    entidad.alturaGrupa = modelo.alturaGrupa || null as any;
    entidad.observaciones = modelo.observaciones || null as any;
    entidad.usuarioId = modelo.usuarioId;

    const guardada = await this.repoPesaje.save(entidad);
    return new Pesaje(guardada.id, guardada.ganadoId, guardada.fechaPesaje, Number(guardada.peso), guardada.gananciaPeso ? Number(guardada.gananciaPeso) : null, guardada.condicionCorporal ? Number(guardada.condicionCorporal) : null, guardada.circunferenciaEscrotal ? Number(guardada.circunferenciaEscrotal) : null, guardada.alturaGrupa ? Number(guardada.alturaGrupa) : null, guardada.usuarioId, guardada.observaciones || null, guardada.fechaRegistro);
  }

  async obtenerPesajesPorAnimal(ganadoId: string): Promise<Pesaje[]> {
    const entidades = await this.repoPesaje.find({ where: { ganadoId }, order: { fechaPesaje: 'DESC' } });
    return entidades.map(e => new Pesaje(e.id, e.ganadoId, e.fechaPesaje, Number(e.peso), e.gananciaPeso ? Number(e.gananciaPeso) : null, e.condicionCorporal ? Number(e.condicionCorporal) : null, e.circunferenciaEscrotal ? Number(e.circunferenciaEscrotal) : null, e.alturaGrupa ? Number(e.alturaGrupa) : null, e.usuarioId, e.observaciones || null, e.fechaRegistro));
  }

  async obtenerUltimoPesaje(ganadoId: string): Promise<Pesaje | null> {
    const entidad = await this.repoPesaje.findOne({ where: { ganadoId }, order: { fechaPesaje: 'DESC' } });
    if (!entidad) return null;
    return new Pesaje(entidad.id, entidad.ganadoId, entidad.fechaPesaje, Number(entidad.peso), entidad.gananciaPeso ? Number(entidad.gananciaPeso) : null, entidad.condicionCorporal ? Number(entidad.condicionCorporal) : null, entidad.circunferenciaEscrotal ? Number(entidad.circunferenciaEscrotal) : null, entidad.alturaGrupa ? Number(entidad.alturaGrupa) : null, entidad.usuarioId, entidad.observaciones || null, entidad.fechaRegistro);
  }

  async sumarLitrosPorFecha(fecha: Date): Promise<number> {
    // Rango del día completo
    const inicio = new Date(fecha);
    inicio.setHours(0, 0, 0, 0);
    const fin = new Date(fecha);
    fin.setHours(23, 59, 59, 999);

    const { sum } = await this.repoLeche
      .createQueryBuilder('leche')
      .select('SUM(leche.litros)', 'sum')
      .where('leche.fechaOrdene BETWEEN :inicio AND :fin', { inicio, fin })
      .getRawOne();
    
    return Number(sum) || 0;
  }
}
