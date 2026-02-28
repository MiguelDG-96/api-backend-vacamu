import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class RegistrarVacunacionDto {
  @IsUUID()
  @IsNotEmpty()
  ganadoId: string;

  @IsString()
  @IsNotEmpty()
  nombreVacuna: string;

  @IsDateString()
  @IsNotEmpty()
  fechaAplicacion: string;

  @IsDateString()
  @IsOptional()
  fechaProximaDosis?: string;

  @IsString()
  @IsOptional()
  lote?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
