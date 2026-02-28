import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacunacionEntidad } from './infraestructura/persistencia/vacunacion.entidad';
import { TratamientoEntidad } from './infraestructura/persistencia/tratamiento.entidad';
import { RepositorioSanitarioTypeorm } from './infraestructura/persistencia/repositorio-sanitario-typeorm';
import { SanidadControlador } from './infraestructura/controladores/sanidad.controlador';
import { RegistrarVacunacionCasoUso } from './aplicacion/casos-uso/registrar-vacunacion.caso-uso';
import { TrazabilidadModulo } from '../trazabilidad/trazabilidad.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VacunacionEntidad, TratamientoEntidad]),
    TrazabilidadModulo, // Importar para validar existencia de ganado
  ],
  controllers: [SanidadControlador],
  providers: [
    RegistrarVacunacionCasoUso,
    {
      provide: 'RepositorioSanitario',
      useClass: RepositorioSanitarioTypeorm,
    },
  ],
})
export class SanidadModulo {}
