import { ProduccionLeche } from '../entidades/produccion-leche';
import { Pesaje } from '../entidades/pesaje';

export interface RepositorioProduccion {
  guardarProduccionLeche(produccion: ProduccionLeche): Promise<ProduccionLeche>;
  obtenerProduccionPorAnimal(ganadoId: string): Promise<ProduccionLeche[]>;
  
  guardarPesaje(pesaje: Pesaje): Promise<Pesaje>;
  obtenerPesajesPorAnimal(ganadoId: string): Promise<Pesaje[]>;
  obtenerUltimoPesaje(ganadoId: string): Promise<Pesaje | null>;
  sumarLitrosPorFecha(fecha: Date): Promise<number>;
}
