import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { RepositorioProduccion } from '../../dominio/puertos/repositorio-produccion';
import type { RepositorioGanado } from '../../../trazabilidad/dominio/puertos/repositorio-ganado';
import { Pesaje } from '../../dominio/entidades/pesaje';
import { RegistrarPesajeDto } from '../dtos/registrar-pesaje.dto';

@Injectable()
export class RegistrarPesajeCasoUso {
  constructor(
    @Inject('RepositorioProduccion')
    private readonly repoProduccion: RepositorioProduccion,
    @Inject('RepositorioGanado')
    private readonly repoGanado: RepositorioGanado,
  ) {}

  async ejecutar(dto: RegistrarPesajeDto, usuarioId: string): Promise<Pesaje> {
    const animal = await this.repoGanado.buscarPorId(dto.ganadoId);
    if (!animal) throw new NotFoundException('Animal no encontrado');

    const ultimoPesaje = await this.repoProduccion.obtenerUltimoPesaje(dto.ganadoId);
    let ganancia: number | null = null;
    
    if (ultimoPesaje) {
      ganancia = Number((dto.peso - ultimoPesaje.peso).toFixed(2));
    }

    const pesaje = new Pesaje(
      null,
      dto.ganadoId,
      new Date(dto.fechaPesaje),
      dto.peso,
      ganancia,
      dto.condicionCorporal || null,
      dto.circunferenciaEscrotal || null,
      dto.alturaGrupa || null,
      usuarioId,
      dto.observaciones || null,
      new Date(),
    );

    // Actualizar peso actual del animal en trazabilidad
    animal.pesoActual = dto.peso;
    await this.repoGanado.guardar(animal);

    return this.repoProduccion.guardarPesaje(pesaje);
  }
}
