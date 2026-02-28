import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { RepositorioReproductivo } from '../../dominio/puertos/repositorio-reproductivo';
import type { RepositorioGanado } from '../../../trazabilidad/dominio/puertos/repositorio-ganado';
import { Parto } from '../../dominio/entidades/parto';
import { Ganado } from '../../../trazabilidad/dominio/entidades/ganado';
import { RegistrarPartoDto } from '../dtos/registrar-parto.dto';

@Injectable()
export class RegistrarPartoCasoUso {
  constructor(
    @Inject('RepositorioReproductivo')
    private readonly repoRepro: RepositorioReproductivo,
    @Inject('RepositorioGanado')
    private readonly repoGanado: RepositorioGanado,
  ) {}

  async ejecutar(dto: RegistrarPartoDto, usuarioId: string): Promise<Parto> {
    const madre = await this.repoGanado.buscarPorId(dto.ganadoId);
    if (!madre) throw new NotFoundException('Madre no encontrada');

    let criaId: string | null = null;

    // Si la cría está viva y se proporcionan datos, registrarla automáticamente
    if (dto.estadoCria === 'VIVA' && dto.idCria && dto.sexoCria) {
      const nuevaCria = new Ganado(
        null,
        dto.idCria,
        null, // RFID opcional
        null, // Nombre opcional
        madre.raza, // Hereda raza madre por defecto
        dto.sexoCria,
        new Date(dto.fechaParto),
        30, // Peso inicial estimado defecto
        'ACTIVO',
        madre.proposito, // Hereda propósito
        usuarioId,
        madre.id, // Madre
        null, // Padre (desconocido por ahora)
        madre.loteId, // Mismo lote que la madre
        madre.potreroId,
        new Date()
      );
      
      const criaGuardada = await this.repoGanado.guardar(nuevaCria);
      criaId = criaGuardada.id;
    }

    const parto = new Parto(
      null,
      dto.ganadoId,
      new Date(dto.fechaParto),
      dto.tipoParto,
      criaId,
      dto.estadoCria,
      dto.observaciones || null,
      usuarioId,
      new Date(),
    );

    return this.repoRepro.registrarParto(parto);
  }
}
