import { Controller, Post, Body } from '@nestjs/common';
import { RegistrarInseminacionCasoUso } from '../../aplicacion/casos-uso/registrar-inseminacion.caso-uso';
import { RegistrarPartoCasoUso } from '../../aplicacion/casos-uso/registrar-parto.caso-uso';
import { RegistrarInseminacionDto } from '../../aplicacion/dtos/registrar-inseminacion.dto';
import { RegistrarPartoDto } from '../../aplicacion/dtos/registrar-parto.dto';

@Controller('reproduccion')
export class ReproduccionControlador {
  constructor(
    private readonly registrarInseminacion: RegistrarInseminacionCasoUso,
    private readonly registrarParto: RegistrarPartoCasoUso,
  ) {}

  @Post('inseminaciones')
  async crearInseminacion(@Body() dto: RegistrarInseminacionDto) {
    const usuarioId = 'temp-user-uuid';
    return this.registrarInseminacion.ejecutar(dto, usuarioId);
  }

  @Post('partos')
  async crearParto(@Body() dto: RegistrarPartoDto) {
    const usuarioId = 'temp-user-uuid';
    return this.registrarParto.ejecutar(dto, usuarioId);
  }
}
