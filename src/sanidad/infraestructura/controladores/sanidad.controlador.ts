import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RegistrarVacunacionCasoUso } from '../../aplicacion/casos-uso/registrar-vacunacion.caso-uso';
import { RegistrarVacunacionDto } from '../../aplicacion/dtos/registrar-vacunacion.dto';

@Controller('sanidad')
export class SanidadControlador {
  constructor(private readonly registrarVacunacion: RegistrarVacunacionCasoUso) {}

  @Post('vacunas')
  async registrarVacuna(@Body() dto: RegistrarVacunacionDto) {
    const usuarioId = 'temp-user-uuid'; // TODO: Get from auth
    return this.registrarVacunacion.ejecutar(dto, usuarioId);
  }
}
