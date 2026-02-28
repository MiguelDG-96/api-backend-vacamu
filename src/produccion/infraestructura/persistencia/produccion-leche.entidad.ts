import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { GanadoEntidad } from '../../../trazabilidad/infraestructura/persistencia/ganado.entidad';
import { UsuarioEntidad } from '../../../administracion/infraestructura/persistencia/usuario.entidad';

@Entity('registros_leche')
export class ProduccionLecheEntidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ganado_id' })
  ganadoId: string;

  @ManyToOne(() => GanadoEntidad)
  @JoinColumn({ name: 'ganado_id' })
  ganado: GanadoEntidad;

  @Column({ name: 'fecha_ordene', type: 'timestamp' })
  fechaOrdene: Date;

  @Column()
  jornada: string;

  @Column('decimal', { precision: 5, scale: 2 })
  litros: number;

  @Column({ type: 'varchar', nullable: true })
  calidad: string;

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
