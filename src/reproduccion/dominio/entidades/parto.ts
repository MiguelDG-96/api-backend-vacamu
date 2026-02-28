export class Parto {
  constructor(
    public id: string | null,
    public ganadoId: string, // La madre
    public fechaParto: Date,
    public tipoParto: 'NORMAL' | 'DISTOCICO' | 'CESAREA' | 'ABORTO',
    public criaId: string | null, // ID de la cría resultante (si vive/se registra)
    public estadoCria: 'VIVA' | 'MUERTA',
    public observaciones: string | null,
    public usuarioId: string,
    public fechaRegistro: Date,
  ) {}
}
