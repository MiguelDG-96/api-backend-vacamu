import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { GanadoEntidad } from '../../../trazabilidad/infraestructura/persistencia/ganado.entidad';
import { UsuarioEntidad } from '../../../administracion/infraestructura/persistencia/usuario.entidad';

@Entity('registros_inseminacion')
export class InseminacionEntidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ganado_id' })
  ganadoId: string;

  @ManyToOne(() => GanadoEntidad)
  @JoinColumn({ name: 'ganado_id' })
  ganado: GanadoEntidad;

  @Column({ name: 'fecha_inseminacion', type: 'date' })
  fechaInseminacion: Date;

  @Column({ default: 'IA' })
  tipo: string;

  @Column({ name: 'toro_id', type: 'varchar', nullable: true })
  toroId: string; // Referencia a Ganado (toro del sistema) opcional

  @Column({ name: 'pajilla_id', type: 'varchar', nullable: true })
  pajillaId: string;

  @Column({ type: 'varchar', nullable: true })
  tecnico: string;

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
