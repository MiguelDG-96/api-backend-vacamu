import { Controller, Post, Body } from '@nestjs/common';
import { RegistrarProduccionLecheCasoUso } from '../../aplicacion/casos-uso/registrar-produccion-leche.caso-uso';
import { RegistrarPesajeCasoUso } from '../../aplicacion/casos-uso/registrar-pesaje.caso-uso';
import { RegistrarProduccionLecheDto } from '../../aplicacion/dtos/registrar-produccion-leche.dto';
import { RegistrarPesajeDto } from '../../aplicacion/dtos/registrar-pesaje.dto';

@Controller('produccion')
export class ProduccionControlador {
  constructor(
    private readonly registrarLeche: RegistrarProduccionLecheCasoUso,
    private readonly registrarPesaje: RegistrarPesajeCasoUso,
  ) {}

  @Post('leche')
  async crearRegistroLeche(@Body() dto: RegistrarProduccionLecheDto) {
    const usuarioId = 'temp-user-uuid';
    return this.registrarLeche.ejecutar(dto, usuarioId);
  }

  @Post('pesaje')
  async crearRegistroPesaje(@Body() dto: RegistrarPesajeDto) {
    const usuarioId = 'temp-user-uuid';
    return this.registrarPesaje.ejecutar(dto, usuarioId);
  }
}
