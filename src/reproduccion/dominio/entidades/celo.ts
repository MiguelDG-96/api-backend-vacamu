export class Celo {
  constructor(
    public id: string | null,
    public ganadoId: string,
    public fechaInicio: Date,
    public observaciones: string | null,
    public usuarioId: string,
    public fechaRegistro: Date,
  ) {}
}
