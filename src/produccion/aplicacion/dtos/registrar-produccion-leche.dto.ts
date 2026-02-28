import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class RegistrarProduccionLecheDto {
  @IsUUID()
  @IsNotEmpty()
  ganadoId: string;

  @IsDateString()
  @IsNotEmpty()
  fechaOrdene: string;

  @IsEnum(['MAÑANA', 'TARDE'])
  jornada: 'MAÑANA' | 'TARDE';

  @IsNumber()
  @Min(0)
  litros: number;

  @IsString()
  @IsOptional()
  calidad?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
