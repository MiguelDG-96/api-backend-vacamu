import { Inject, Injectable, ConflictException } from '@nestjs/common';
import type { RepositorioUsuario } from '../../dominio/puertos/repositorio-usuario';
import { Usuario } from '../../dominio/entidades/usuario';
import { CrearUsuarioDto } from '../dtos/crear-usuario.dto';

@Injectable()
export class CrearUsuarioCasoUso {
  constructor(
    @Inject('RepositorioUsuario')
    private readonly repositorioUsuario: RepositorioUsuario,
  ) {}

  async ejecutar(dto: CrearUsuarioDto): Promise<Usuario> {
    const existente = await this.repositorioUsuario.buscarPorEmail(dto.email);
    if (existente) {
      throw new ConflictException('El email ya está registrado');
    }

    const nuevoUsuario = new Usuario(
      null, // ID generado por BD
      dto.nombreCompleto,
      dto.email,
      dto.rol,
      new Date(),
      true,
      dto.nombreFinca,
      dto.ubicacionFinca,
    );

    return this.repositorioUsuario.guardar(nuevoUsuario);
  }
}
