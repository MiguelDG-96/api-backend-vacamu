export class Ganado {
  constructor(
    public id: string | null,
    public numeroIdentificacion: string, // Arete visual / ID único visible
    public rfidTag: string | null, // Tag electrónico opcional
    public nombre: string | null,
    public raza: string, // Podría ser ID de raza o string
    public sexo: 'MACHO' | 'HEMBRA',
    public fechaNacimiento: Date,
    public pesoActual: number,
    public estado: 'ACTIVO' | 'VENDIDO' | 'MUERTO' | 'PERDIDO',
    public proposito: 'LECHE' | 'CARNE' | 'DOBLE_PROPOSITO' | 'CRIA',
    public usuarioId: string, // Propietario
    public madreId: string | null, // Genealogía
    public padreId: string | null,
    public loteId: string | null, // Ubicación
    public potreroId: string | null,
    public fechaRegistro: Date,
  ) {}

  calcularEdadMeses(): number {
    const hoy = new Date();
    const nacimiento = new Date(this.fechaNacimiento);
    let meses = (hoy.getFullYear() - nacimiento.getFullYear()) * 12;
    meses -= nacimiento.getMonth();
    meses += hoy.getMonth();
    return meses <= 0 ? 0 : meses;
  }

  estaActivo(): boolean {
    return this.estado === 'ACTIVO';
  }
}
