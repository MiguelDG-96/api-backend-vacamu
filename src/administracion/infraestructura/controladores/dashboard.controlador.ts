import { Controller, Get, Inject } from '@nestjs/common';
import type { RepositorioGanado } from '../../../trazabilidad/dominio/puertos/repositorio-ganado';
import type { RepositorioProduccion } from '../../../produccion/dominio/puertos/repositorio-produccion';

@Controller('dashboard')
export class DashboardControlador {
  constructor(
    @Inject('RepositorioGanado')
    private readonly repoGanado: RepositorioGanado,
    @Inject('RepositorioProduccion')
    private readonly repoProduccion: RepositorioProduccion,
  ) {}

  @Get('resumen')
  async obtenerResumen() {
    // 1. Total Ganado
    const totalGanado = await this.repoGanado.contarTotal();

    // 2. Producción Hoy
    const hoy = new Date();
    const produccionLitrosHoy = await this.repoProduccion.sumarLitrosPorFecha(hoy);

    // 3. Alertas (Simuladas por ahora hasta implementar módulo Alertas)
    const alertasSalud = 3; 

    return {
      totalGanado,
      produccionLitrosHoy,
      alertasSalud,
    };
  }
}
