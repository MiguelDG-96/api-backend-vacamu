import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { GanadoEntidad } from '../../../trazabilidad/infraestructura/persistencia/ganado.entidad';
import { UsuarioEntidad } from '../../../administracion/infraestructura/persistencia/usuario.entidad';

@Entity('registros_celo')
export class CeloEntidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ganado_id' })
  ganadoId: string;

  @ManyToOne(() => GanadoEntidad)
  @JoinColumn({ name: 'ganado_id' })
  ganado: GanadoEntidad;

  @Column({ name: 'fecha_inicio', type: 'timestamp' })
  fechaInicio: Date;

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
