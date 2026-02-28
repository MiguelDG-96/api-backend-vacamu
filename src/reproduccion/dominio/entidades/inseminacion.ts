export class Inseminacion {
  constructor(
    public id: string | null,
    public ganadoId: string,
    public fechaInseminacion: Date,
    public tipo: 'IA' | 'MONTA_NATURAL', // IA: Inseminación Artificial
    public toroId: string | null, // Si es monta natural o toro conocido
    public pajillaId: string | null, // Si es IA, código de pajilla
    public tecnico: string | null, // Nombre del técnico
    public observaciones: string | null,
    public usuarioId: string,
    public fechaRegistro: Date,
  ) {}
}
