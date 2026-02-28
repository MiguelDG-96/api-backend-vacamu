import { Vacunacion } from '../entidades/vacunacion';
import { Tratamiento } from '../entidades/tratamiento';

export interface RepositorioSanitario {
  guardarVacunacion(vacunacion: Vacunacion): Promise<Vacunacion>;
  obtenerVacunasPorAnimal(ganadoId: string): Promise<Vacunacion[]>;
  
  guardarTratamiento(tratamiento: Tratamiento): Promise<Tratamiento>;
  obtenerTratamientosPorAnimal(ganadoId: string): Promise<Tratamiento[]>;
}
