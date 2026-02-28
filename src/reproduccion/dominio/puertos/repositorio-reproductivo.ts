import { Celo } from '../entidades/celo';
import { Inseminacion } from '../entidades/inseminacion';
import { Parto } from '../entidades/parto';

export interface RepositorioReproductivo {
  registrarCelo(celo: Celo): Promise<Celo>;
  registrarInseminacion(inseminacion: Inseminacion): Promise<Inseminacion>;
  registrarParto(parto: Parto): Promise<Parto>;
  obtenerHistorialReproductivo(ganadoId: string): Promise<any[]>;
}
