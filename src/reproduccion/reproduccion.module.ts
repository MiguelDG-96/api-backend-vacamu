import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CeloEntidad } from './infraestructura/persistencia/celo.entidad';
import { InseminacionEntidad } from './infraestructura/persistencia/inseminacion.entidad';
import { RepositorioReproductivoTypeorm } from './infraestructura/persistencia/repositorio-reproductivo-typeorm';
import { RegistrarInseminacionCasoUso } from './aplicacion/casos-uso/registrar-inseminacion.caso-uso';
import { ReproduccionControlador } from './infraestructura/controladores/reproduccion.controlador';
import { RegistrarPartoCasoUso } from './aplicacion/casos-uso/registrar-parto.caso-uso';
import { TrazabilidadModulo } from '../trazabilidad/trazabilidad.module';
import { PartoEntidad } from './infraestructura/persistencia/parto.entidad';

@Module({
  imports: [
    TypeOrmModule.forFeature([CeloEntidad, InseminacionEntidad, PartoEntidad]),
    TrazabilidadModulo,
  ],
  controllers: [ReproduccionControlador],
  providers: [
    RegistrarInseminacionCasoUso,
    RegistrarPartoCasoUso,
    {
      provide: 'RepositorioReproductivo',
      useClass: RepositorioReproductivoTypeorm,
    },
  ],
})
export class ReproduccionModulo {}
