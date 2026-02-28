export class Usuario {
  constructor(
    public id: string | null,
    public nombreCompleto: string,
    public email: string,
    public rol: 'ADMIN' | 'VETERINARIO' | 'TRABAJADOR' | 'GANADERO',
    public fechaRegistro: Date,
    public activo: boolean,
    public nombreFinca?: string,
    public ubicacionFinca?: string,
    public password?: string, // Agregado para Auth
    public googleId?: string,
    public fotoUrl?: string,
  ) {}

  esAdmin(): boolean {
    return this.rol === 'ADMIN';
  }

  activar(): void {
    this.activo = true;
  }

  desactivar(): void {
    this.activo = false;
  }
}
