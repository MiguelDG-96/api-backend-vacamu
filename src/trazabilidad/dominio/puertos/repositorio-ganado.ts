import { Ganado } from '../entidades/ganado';

export interface RepositorioGanado {
  guardar(animal: Ganado): Promise<Ganado>;
  buscarPorId(id: string): Promise<Ganado | null>;
  buscarPorIdentificacion(numero: string, usuarioId: string): Promise<Ganado | null>;
  listarPorUsuario(usuarioId: string): Promise<Ganado[]>;
  buscarGenealogia(id: string): Promise<{ madre: Ganado | null; padre: Ganado | null }>;
  contarTotal(): Promise<number>;
  eliminar(id: string): Promise<void>;
}
