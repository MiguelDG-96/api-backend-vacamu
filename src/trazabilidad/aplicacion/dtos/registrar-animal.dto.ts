import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class RegistrarAnimalDto {
  @IsString()
  @IsNotEmpty()
  numeroIdentificacion: string;

  @IsString()
  @IsOptional()
  rfidTag?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsNotEmpty()
  raza: string;

  @IsEnum(['MACHO', 'HEMBRA'])
  sexo: 'MACHO' | 'HEMBRA';

  @IsDateString()
  fechaNacimiento: string; // Recibimos string ISO desde frontend

  @IsNumber()
  @Min(0)
  pesoActual: number;

  @IsEnum(['LECHE', 'CARNE', 'DOBLE_PROPOSITO', 'CRIA'])
  @IsOptional()
  proposito?: 'LECHE' | 'CARNE' | 'DOBLE_PROPOSITO' | 'CRIA';

  // Genealogía opcional
  @IsUUID()
  @IsOptional()
  madreId?: string;

  @IsUUID()
  @IsOptional()
  padreId?: string;

  // Ubicación opcional
  @IsUUID()
  @IsOptional()
  loteId?: string;

  @IsUUID()
  @IsOptional()
  potreroId?: string;
}
