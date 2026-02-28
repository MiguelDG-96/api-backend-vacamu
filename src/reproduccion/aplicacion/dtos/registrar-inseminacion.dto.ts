import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class RegistrarInseminacionDto {
  @IsUUID()
  @IsNotEmpty()
  ganadoId: string;

  @IsDateString()
  @IsNotEmpty()
  fechaInseminacion: string;

  @IsEnum(['IA', 'MONTA_NATURAL'])
  tipo: 'IA' | 'MONTA_NATURAL';

  @IsUUID()
  @IsOptional()
  toroId?: string;

  @IsString()
  @IsOptional()
  pajillaId?: string;

  @IsString()
  @IsOptional()
  tecnico?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
