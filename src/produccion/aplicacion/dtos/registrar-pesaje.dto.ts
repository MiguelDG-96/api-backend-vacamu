import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class RegistrarPesajeDto {
  @IsUUID()
  @IsNotEmpty()
  ganadoId: string;

  @IsDateString()
  @IsNotEmpty()
  fechaPesaje: string;

  @IsNumber()
  @Min(0)
  peso: number;

  @IsNumber()
  @IsOptional()
  condicionCorporal?: number; // 1-5

  @IsNumber()
  @IsOptional()
  circunferenciaEscrotal?: number;

  @IsNumber()
  @IsOptional()
  alturaGrupa?: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
