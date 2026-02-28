import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GanadoEntidad } from './infraestructura/persistencia/ganado.entidad';
import { RepositorioGanadoTypeorm } from './infraestructura/persistencia/repositorio-ganado-typeorm';
import { GanadoControlador } from './infraestructura/controladores/ganado.controlador';
import { RegistrarAnimalCasoUso } from './aplicacion/casos-uso/registrar-animal.caso-uso';
import { ListarGanadoCasoUso } from './aplicacion/casos-uso/listar-ganado.caso-uso';
import { ObtenerGanadoCasoUso } from './aplicacion/casos-uso/obtener-ganado.caso-uso';
import { EliminarGanadoCasoUso } from './aplicacion/casos-uso/eliminar-ganado.caso-uso';

@Module({
  imports: [TypeOrmModule.forFeature([GanadoEntidad])],
  controllers: [GanadoControlador],
  providers: [
    RegistrarAnimalCasoUso,
    ListarGanadoCasoUso,
    ObtenerGanadoCasoUso,
    EliminarGanadoCasoUso,
    {
      provide: 'RepositorioGanado',
      useClass: RepositorioGanadoTypeorm,
    },
  ],
  exports: ['RepositorioGanado'],
})
export class TrazabilidadModulo {}
