import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { RepositorioUsuario } from '../administracion/dominio/puertos/repositorio-usuario';
import { Usuario } from '../administracion/dominio/entidades/usuario';
// import { compare } from 'bcrypt'; // Usar bcrypt real en prod

@Injectable()
export class AuthService {
  constructor(
    @Inject('RepositorioUsuario')
    private readonly usuarioRepositorio: RepositorioUsuario,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, pass: string): Promise<any> {
    const usuario = await this.usuarioRepositorio.buscarPorEmail(email);
    if (usuario && usuario.password === pass) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  // Lógica para login/registro con Google
  async validarUsuarioGoogle(profile: { email: string; googleId: string; nombre: string; foto?: string }): Promise<any> {
    let usuario = await this.usuarioRepositorio.buscarPorEmail(profile.email);

    if (usuario) {
      // Si existe, actualizamos googleId y foto si no los tiene o han cambiado
      // Nota: Idealmente deberíamos tener un método "actualizar" en el repositorio.
      // Por brevedad, si el repo no tiene actualizar, asumiremos que ya está o lo dejamos así.
      // Pero si queremos persistir el googleId en una cuenta existente, necesitamos `guardar`.
      let modificado = false;
      if (!usuario.googleId) {
        usuario.googleId = profile.googleId;
        modificado = true;
      }
      if (!usuario.fotoUrl && profile.foto) {
        usuario.fotoUrl = profile.foto;
        modificado = true;
      }

      if (modificado) {
         await this.usuarioRepositorio.guardar(usuario);
      }
    } else {
      // Si no existe, creamos uno nuevo
      const nuevoUsuario = new Usuario(
        null, // ID se genera en BD
        profile.nombre,
        profile.email,
        'GANADERO', // Rol por defecto
        new Date(),
        true,
        undefined,
        undefined,
        undefined, // password null
        profile.googleId,
        profile.foto
      );
      usuario = await this.usuarioRepositorio.guardar(nuevoUsuario);
    }

    const { password, ...result } = usuario;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: user,
    };
  }
}
