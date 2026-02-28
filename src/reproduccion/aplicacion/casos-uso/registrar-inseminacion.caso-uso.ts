import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { RepositorioReproductivo } from '../../dominio/puertos/repositorio-reproductivo';
import type { RepositorioGanado } from '../../../trazabilidad/dominio/puertos/repositorio-ganado';
import { Inseminacion } from '../../dominio/entidades/inseminacion';
import { RegistrarInseminacionDto } from '../dtos/registrar-inseminacion.dto';

@Injectable()
export class RegistrarInseminacionCasoUso {
  constructor(
    @Inject('RepositorioReproductivo')
    private readonly repoRepro: RepositorioReproductivo,
    @Inject('RepositorioGanado')
    private readonly repoGanado: RepositorioGanado,
  ) {}

  async ejecutar(dto: RegistrarInseminacionDto, usuarioId: string): Promise<Inseminacion> {
    const animal = await this.repoGanado.buscarPorId(dto.ganadoId);
    if (!animal) throw new NotFoundException('Animal no encontrado');
    
    // Aquí podríamos validar si es HEMBRA, si está en edad reproductiva, etc.

    const inseminacion = new Inseminacion(
      null,
      dto.ganadoId,
      new Date(dto.fechaInseminacion),
      dto.tipo,
      dto.toroId || null,
      dto.pajillaId || null,
      dto.tecnico || null,
      dto.observaciones || null,
      usuarioId,
      new Date(),
    );

    return this.repoRepro.registrarInseminacion(inseminacion);
  }
}
