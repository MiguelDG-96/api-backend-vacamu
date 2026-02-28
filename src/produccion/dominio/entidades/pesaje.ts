export class Pesaje {
  constructor(
    public id: string | null,
    public ganadoId: string,
    public fechaPesaje: Date,
    public peso: number, // en Kg
    public gananciaPeso: number | null, // Calculado respecto al pesaje anterior
    public condicionCorporal: number | null, // Escala 1-5
    public circunferenciaEscrotal: number | null, // Solo machos
    public alturaGrupa: number | null,
    public usuarioId: string,
    public observaciones: string | null,
    public fechaRegistro: Date,
  ) {}
}
