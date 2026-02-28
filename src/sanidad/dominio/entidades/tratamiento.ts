export class Tratamiento {
  constructor(
    public id: string | null,
    public ganadoId: string,
    public medicamento: string,
    public diagnostico: string | null, // Razón del tratamiento
    public dosis: string,
    public fechaInicio: Date,
    public fechaFin: Date | null,
    public diasRetiroLeche: number,
    public diasRetiroCarne: number,
    public usuarioId: string,
    public observaciones: string | null,
  ) {}

  enPeriodoRetiro(): boolean {
    if (!this.fechaFin) return true; // Si no ha terminado, está en retiro
    const hoy = new Date();
    const finRetiro = new Date(this.fechaFin);
    finRetiro.setDate(finRetiro.getDate() + Math.max(this.diasRetiroLeche, this.diasRetiroCarne));
    return hoy <= finRetiro;
  }
}
