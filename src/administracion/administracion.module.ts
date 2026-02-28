import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntidad } from './infraestructura/persistencia/usuario.entidad';
import { RepositorioUsuarioTypeorm } from './infraestructura/persistencia/repositorio-usuario-typeorm';
import { UsuarioControlador } from './infraestructura/controladores/usuario.controlador';
import { CrearUsuarioCasoUso } from './aplicacion/casos-uso/crear-usuario.caso-uso';

import { TrazabilidadModulo } from '../trazabilidad/trazabilidad.module';
import { ProduccionModulo } from '../produccion/produccion.module';
import { DashboardControlador } from './infraestructura/controladores/dashboard.controlador';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntidad]),
    TrazabilidadModulo,
    ProduccionModulo,
  ],
  controllers: [UsuarioControlador, DashboardControlador],
  providers: [
    CrearUsuarioCasoUso,
    {
      provide: 'RepositorioUsuario',
      useClass: RepositorioUsuarioTypeorm,
    },
  ],
  exports: ['RepositorioUsuario'], // Exportar puerto si otros módulos lo necesitan
})
export class AdministracionModulo {}
