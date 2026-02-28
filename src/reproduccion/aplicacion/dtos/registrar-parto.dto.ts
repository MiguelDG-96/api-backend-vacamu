import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class RegistrarPartoDto {
  @IsUUID()
  @IsNotEmpty()
  ganadoId: string; // Madre

  @IsDateString()
  @IsNotEmpty()
  fechaParto: string;

  @IsEnum(['NORMAL', 'DISTOCICO', 'CESAREA', 'ABORTO'])
  tipoParto: 'NORMAL' | 'DISTOCICO' | 'CESAREA' | 'ABORTO';

  @IsEnum(['VIVA', 'MUERTA'])
  estadoCria: 'VIVA' | 'MUERTA';

  // Datos de la cría (si viva) para crear el registro automático en Ganado
  @IsString()
  @IsOptional()
  idCria?: string; // ID visual / Arete de la cría

  @IsString()
  @IsOptional()
  sexoCria?: 'MACHO' | 'HEMBRA';

  @IsString()
  @IsOptional()
  observaciones?: string;
}
