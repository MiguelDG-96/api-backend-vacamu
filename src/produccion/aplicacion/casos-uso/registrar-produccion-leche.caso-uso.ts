import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { RepositorioProduccion } from '../../dominio/puertos/repositorio-produccion';
import type { RepositorioGanado } from '../../../trazabilidad/dominio/puertos/repositorio-ganado';
import { ProduccionLeche } from '../../dominio/entidades/produccion-leche';
import { RegistrarProduccionLecheDto } from '../dtos/registrar-produccion-leche.dto';

@Injectable()
export class RegistrarProduccionLecheCasoUso {
  constructor(
    @Inject('RepositorioProduccion')
    private readonly repoProduccion: RepositorioProduccion,
    @Inject('RepositorioGanado')
    private readonly repoGanado: RepositorioGanado,
  ) {}

  async ejecutar(dto: RegistrarProduccionLecheDto, usuarioId: string): Promise<ProduccionLeche> {
    const animal = await this.repoGanado.buscarPorId(dto.ganadoId);
    if (!animal) {
      throw new NotFoundException('Animal no encontrado');
    }

    // Aquí se podrían agregar validaciones: solo hembras pueden dar leche, etc.

    const produccion = new ProduccionLeche(
      null,
      dto.ganadoId,
      new Date(dto.fechaOrdene),
      dto.jornada,
      dto.litros,
      dto.calidad || null,
      usuarioId,
      dto.observaciones || null,
      new Date(),
    );

    return this.repoProduccion.guardarProduccionLeche(produccion);
  }
}
