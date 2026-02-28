import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CrearUsuarioCasoUso } from '../../aplicacion/casos-uso/crear-usuario.caso-uso';
import { CrearUsuarioDto } from '../../aplicacion/dtos/crear-usuario.dto';

@Controller('usuarios')
export class UsuarioControlador {
  constructor(private readonly crearUsuarioCasoUso: CrearUsuarioCasoUso) {}

  @Post()
  async crear(@Body() dto: CrearUsuarioDto) {
    return this.crearUsuarioCasoUso.ejecutar(dto);
  }

  // Aquí irían los otros endpoints (Get, Delete, etc.) inyectando sus respectivos Casos de Uso
}
