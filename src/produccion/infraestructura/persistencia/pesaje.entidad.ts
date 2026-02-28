import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { GanadoEntidad } from '../../../trazabilidad/infraestructura/persistencia/ganado.entidad';
import { UsuarioEntidad } from '../../../administracion/infraestructura/persistencia/usuario.entidad';

@Entity('registros_pesaje')
export class PesajeEntidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ganado_id' })
  ganadoId: string;

  @ManyToOne(() => GanadoEntidad)
  @JoinColumn({ name: 'ganado_id' })
  ganado: GanadoEntidad;

  @Column({ name: 'fecha_pesaje', type: 'date' })
  fechaPesaje: Date;

  @Column('decimal', { precision: 6, scale: 2 })
  peso: number;

  @Column('decimal', { name: 'ganancia_peso', precision: 6, scale: 2, nullable: true })
  gananciaPeso: number;

  @Column('decimal', { name: 'condicion_corporal', precision: 3, scale: 1, nullable: true })
  condicionCorporal: number;

  // Medidas adicionales
  @Column('decimal', { name: 'circunferencia_escrotal', precision: 5, scale: 2, nullable: true })
  circunferenciaEscrotal: number;

  @Column('decimal', { name: 'altura_grupa', precision: 5, scale: 2, nullable: true })
  alturaGrupa: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @ManyToOne(() => UsuarioEntidad)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntidad;

  @CreateDateColumn({ name: 'created_at' })
  fechaRegistro: Date;
}
