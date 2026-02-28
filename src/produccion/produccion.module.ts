import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduccionLecheEntidad } from './infraestructura/persistencia/produccion-leche.entidad';
import { PesajeEntidad } from './infraestructura/persistencia/pesaje.entidad';
import { RepositorioProduccionTypeorm } from './infraestructura/persistencia/repositorio-produccion-typeorm';
import { ProduccionControlador } from './infraestructura/controladores/produccion.controlador';
import { RegistrarProduccionLecheCasoUso } from './aplicacion/casos-uso/registrar-produccion-leche.caso-uso';
import { RegistrarPesajeCasoUso } from './aplicacion/casos-uso/registrar-pesaje.caso-uso';
import { TrazabilidadModulo } from '../trazabilidad/trazabilidad.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProduccionLecheEntidad, PesajeEntidad]),
    TrazabilidadModulo,
  ],
  controllers: [ProduccionControlador],
  providers: [
    RegistrarProduccionLecheCasoUso,
    RegistrarPesajeCasoUso,
    {
      provide: 'RepositorioProduccion',
      useClass: RepositorioProduccionTypeorm,
    },
  ],
  exports: ['RepositorioProduccion'],
})
export class ProduccionModulo {}
