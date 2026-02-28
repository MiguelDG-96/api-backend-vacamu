import { Inject, Injectable } from '@nestjs/common';
import type { RepositorioGanado } from '../../dominio/puertos/repositorio-ganado';
import { Ganado } from '../../dominio/entidades/ganado';

@Injectable()
export class ListarGanadoCasoUso {
  constructor(
    @Inject('RepositorioGanado')
    private readonly repositorio: RepositorioGanado,
  ) {}

  async ejecutar(usuarioId: string): Promise<Ganado[]> {
    return this.repositorio.listarPorUsuario(usuarioId);
  }
}
