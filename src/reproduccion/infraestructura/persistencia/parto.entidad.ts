import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { GanadoEntidad } from '../../../trazabilidad/infraestructura/persistencia/ganado.entidad';
import { UsuarioEntidad } from '../../../administracion/infraestructura/persistencia/usuario.entidad';

@Entity('registros_parto')
export class PartoEntidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ganado_id' })
  ganadoId: string;

  @ManyToOne(() => GanadoEntidad)
  @JoinColumn({ name: 'ganado_id' })
  madre: GanadoEntidad;

  @Column({ name: 'fecha_parto', type: 'date' })
  fechaParto: Date;

  @Column({ name: 'tipo_parto' })
  tipoParto: string;

  @Column({ name: 'cria_id', type: 'varchar', nullable: true })
  criaId: string;

  @OneToOne(() => GanadoEntidad, { nullable: true })
  @JoinColumn({ name: 'cria_id' })
  cria: GanadoEntidad;

  @Column({ name: 'estado_cria' })
  estadoCria: string;

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
