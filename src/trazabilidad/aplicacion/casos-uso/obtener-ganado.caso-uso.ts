import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { RepositorioGanado } from '../../dominio/puertos/repositorio-ganado';
import { Ganado } from '../../dominio/entidades/ganado';

@Injectable()
export class ObtenerGanadoCasoUso {
  constructor(
    @Inject('RepositorioGanado')
    private readonly repositorio: RepositorioGanado,
  ) {}

  async ejecutar(id: string): Promise<Ganado> {
    const animal = await this.repositorio.buscarPorId(id);
    if (!animal) {
      throw new NotFoundException(`Animal con ID ${id} no encontrado`);
    }
    return animal;
  }
}
