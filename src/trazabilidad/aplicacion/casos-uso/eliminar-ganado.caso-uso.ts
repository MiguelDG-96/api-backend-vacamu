import { Inject, Injectable } from '@nestjs/common';
import type { RepositorioGanado } from '../../dominio/puertos/repositorio-ganado';

@Injectable()
export class EliminarGanadoCasoUso {
  constructor(
    @Inject('RepositorioGanado')
    private readonly repositorio: RepositorioGanado,
  ) {}

  async ejecutar(id: string): Promise<void> {
    await this.repositorio.eliminar(id);
  }
}
