export class Vacunacion {
  constructor(
    public id: string | null,
    public ganadoId: string,
    public nombreVacuna: string,
    public fechaAplicacion: Date,
    public fechaProximaDosis: Date | null,
    public lote: string | null,
    public observaciones: string | null,
    public usuarioId: string, // Veterinario o responsable
    public fechaRegistro: Date,
  ) {}

  requiereRefuerzo(): boolean {
    return this.fechaProximaDosis !== null && this.fechaProximaDosis > new Date();
  }
}
