import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { GanadoEntidad } from '../../../trazabilidad/infraestructura/persistencia/ganado.entidad';
import { UsuarioEntidad } from '../../../administracion/infraestructura/persistencia/usuario.entidad';

@Entity('registros_tratamientos')
export class TratamientoEntidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ganado_id' })
  ganadoId: string;

  @ManyToOne(() => GanadoEntidad)
  @JoinColumn({ name: 'ganado_id' })
  ganado: GanadoEntidad;

  @Column()
  medicamento: string;

  @Column({ type: 'varchar', nullable: true })
  diagnostico: string;

  @Column()
  dosis: string;

  @Column({ name: 'fecha_inicio', type: 'date' })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin: Date | null;

  @Column({ name: 'dias_retiro_leche', default: 0 })
  diasRetiroLeche: number;

  @Column({ name: 'dias_retiro_carne', default: 0 })
  diasRetiroCarne: number;

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
