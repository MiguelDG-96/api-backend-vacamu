import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { RepositorioSanitario } from '../../dominio/puertos/repositorio-sanitario';
import type { RepositorioGanado } from '../../../trazabilidad/dominio/puertos/repositorio-ganado'; // Cross-module check
import { Vacunacion } from '../../dominio/entidades/vacunacion';
import { RegistrarVacunacionDto } from '../dtos/registrar-vacunacion.dto';

@Injectable()
export class RegistrarVacunacionCasoUso {
  constructor(
    @Inject('RepositorioSanitario')
    private readonly repoSanitario: RepositorioSanitario,
    @Inject('RepositorioGanado')
    private readonly repoGanado: RepositorioGanado,
  ) {}

  async ejecutar(dto: RegistrarVacunacionDto, usuarioId: string): Promise<Vacunacion> {
    // Validar existencia del animal
    const animal = await this.repoGanado.buscarPorId(dto.ganadoId);
    if (!animal) {
      throw new NotFoundException(`El animal con ID ${dto.ganadoId} no existe`);
    }

    const vacunacion = new Vacunacion(
      null,
      dto.ganadoId,
      dto.nombreVacuna,
      new Date(dto.fechaAplicacion),
      dto.fechaProximaDosis ? new Date(dto.fechaProximaDosis) : null,
      dto.lote || null,
      dto.observaciones || null,
      usuarioId,
      new Date(),
    );

    return this.repoSanitario.guardarVacunacion(vacunacion);
  }
}
