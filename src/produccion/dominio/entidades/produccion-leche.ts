export class ProduccionLeche {
  constructor(
    public id: string | null,
    public ganadoId: string,
    public fechaOrdene: Date,
    public jornada: 'MAÑANA' | 'TARDE',
    public litros: number,
    public calidad: string | null, // Grasa, proteína, etc. (opcional simple)
    public usuarioId: string, // Ordeñador
    public observaciones: string | null,
    public fechaRegistro: Date,
  ) {}
}
