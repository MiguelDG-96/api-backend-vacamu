import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombreCompleto: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'VETERINARIO', 'TRABAJADOR', 'GANADERO'])
  rol: 'ADMIN' | 'VETERINARIO' | 'TRABAJADOR' | 'GANADERO';

  @IsString()
  @IsOptional()
  nombreFinca?: string;

  @IsString()
  @IsOptional()
  ubicacionFinca?: string;
}
