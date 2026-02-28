import { Inject, Injectable, ConflictException } from '@nestjs/common';
import type { RepositorioGanado } from '../../dominio/puertos/repositorio-ganado';
import { Ganado } from '../../dominio/entidades/ganado';
import { RegistrarAnimalDto } from '../dtos/registrar-animal.dto';

@Injectable()
export class RegistrarAnimalCasoUso {
  constructor(
    @Inject('RepositorioGanado')
    private readonly repositorio: RepositorioGanado,
  ) {}

  async ejecutar(dto: RegistrarAnimalDto, usuarioId: string): Promise<Ganado> {
    const existente = await this.repositorio.buscarPorIdentificacion(dto.numeroIdentificacion, usuarioId);
    if (existente) {
      throw new ConflictException(`Ya existe un animal con identificación ${dto.numeroIdentificacion}`);
    }

    const nuevoAnimal = new Ganado(
      null,
      dto.numeroIdentificacion,
      dto.rfidTag || null,
      dto.nombre || null,
      dto.raza,
      dto.sexo,
      new Date(dto.fechaNacimiento),
      dto.pesoActual,
      'ACTIVO',
      dto.proposito || 'LECHE', // Default propósito
      usuarioId,
      dto.madreId || null,
      dto.padreId || null,
      dto.loteId || null,
      dto.potreroId || null,
      new Date(),
    );

    return this.repositorio.guardar(nuevoAnimal);
  }
}
