import { Usuario } from '../entidades/usuario';

export interface RepositorioUsuario {
  guardar(usuario: Usuario): Promise<Usuario>;
  buscarPorId(id: string): Promise<Usuario | null>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  listar(): Promise<Usuario[]>;
  eliminar(id: string): Promise<void>;
}
