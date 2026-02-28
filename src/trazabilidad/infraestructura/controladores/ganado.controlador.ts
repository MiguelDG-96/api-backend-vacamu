import { Controller, Post, Body, Get, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard'; // Importar el guard correcto
import { RegistrarAnimalCasoUso } from '../../aplicacion/casos-uso/registrar-animal.caso-uso';
import { ListarGanadoCasoUso } from '../../aplicacion/casos-uso/listar-ganado.caso-uso';
import { ObtenerGanadoCasoUso } from '../../aplicacion/casos-uso/obtener-ganado.caso-uso';
import { EliminarGanadoCasoUso } from '../../aplicacion/casos-uso/eliminar-ganado.caso-uso';
import { RegistrarAnimalDto } from '../../aplicacion/dtos/registrar-animal.dto';

@Controller('ganado')
@UseGuards(JwtAuthGuard) // Proteger todo el controlador
export class GanadoControlador {
  constructor(
    private readonly registrarCasoUso: RegistrarAnimalCasoUso,
    private readonly listarCasoUso: ListarGanadoCasoUso,
    private readonly obtenerCasoUso: ObtenerGanadoCasoUso,
    private readonly eliminarCasoUso: EliminarGanadoCasoUso,
  ) {}

  @Post()
  async registrar(@Body() dto: RegistrarAnimalDto, @Request() req) {
    const usuarioId = req.user.userId; // ID obtenido del token
    return this.registrarCasoUso.ejecutar(dto, usuarioId);
  }

  @Get()
  async listar(@Request() req) {
    const usuarioId = req.user.userId;
    return this.listarCasoUso.ejecutar(usuarioId);
  }

  @Get(':id')
  async obtener(@Param('id') id: string) {
    return this.obtenerCasoUso.ejecutar(id);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return this.eliminarCasoUso.ejecutar(id);
  }
}
