import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositorioUsuario } from '../../dominio/puertos/repositorio-usuario';
import { Usuario } from '../../dominio/entidades/usuario';
import { UsuarioEntidad } from './usuario.entidad';

@Injectable()
export class RepositorioUsuarioTypeorm implements RepositorioUsuario {
  constructor(
    @InjectRepository(UsuarioEntidad)
    private readonly repositorio: Repository<UsuarioEntidad>,
  ) {}

  async guardar(usuario: Usuario): Promise<Usuario> {
    const entidad = this.mapearAEntidad(usuario);
    const guardado = await this.repositorio.save(entidad);
    return this.mapearADominio(guardado);
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    const entidad = await this.repositorio.findOneBy({ id });
    return entidad ? this.mapearADominio(entidad) : null;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const entidad = await this.repositorio.findOneBy({ email });
    return entidad ? this.mapearADominio(entidad) : null;
  }

  async listar(): Promise<Usuario[]> {
    const entidades = await this.repositorio.find();
    return entidades.map(e => this.mapearADominio(e));
  }

  async eliminar(id: string): Promise<void> {
    await this.repositorio.softDelete(id);
  }

  // Mappers simples (podrían moverse a una clase separada)
  private mapearADominio(entidad: UsuarioEntidad): Usuario {
    return new Usuario(
      entidad.id,
      entidad.nombreCompleto,
      entidad.email,
      entidad.rol as any,
      entidad.fechaRegistro,
      entidad.activo,
      entidad.nombreFinca || undefined,
      entidad.ubicacionFinca || undefined,
      undefined, // password (no se mapea al dominio por seguridad al listar, o se maneja aparte)
      entidad.googleId || undefined,
      entidad.fotoUrl || undefined,
    );
  }

  private mapearAEntidad(usuario: Usuario): UsuarioEntidad {
    const entidad = new UsuarioEntidad();
    if (usuario.id) entidad.id = usuario.id;
    entidad.nombreCompleto = usuario.nombreCompleto;
    entidad.email = usuario.email;
    entidad.rol = usuario.rol;
    entidad.activo = usuario.activo;
    entidad.nombreFinca = usuario.nombreFinca || null;
    entidad.ubicacionFinca = usuario.ubicacionFinca || null;
    entidad.googleId = usuario.googleId || null;
    entidad.fotoUrl = usuario.fotoUrl || null;
    if (usuario.password) entidad.password = usuario.password;
    return entidad;
  }
}
