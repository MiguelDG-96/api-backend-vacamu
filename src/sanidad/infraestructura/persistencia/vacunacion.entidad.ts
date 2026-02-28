import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { GanadoEntidad } from '../../../trazabilidad/infraestructura/persistencia/ganado.entidad';
import { UsuarioEntidad } from '../../../administracion/infraestructura/persistencia/usuario.entidad';

@Entity('registros_vacunacion')
export class VacunacionEntidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ganado_id' })
  ganadoId: string;

  @ManyToOne(() => GanadoEntidad)
  @JoinColumn({ name: 'ganado_id' })
  ganado: GanadoEntidad;

  @Column({ name: 'nombre_vacuna' })
  nombreVacuna: string;

  @Column({ name: 'fecha_aplicacion', type: 'date' })
  fechaAplicacion: Date;

  @Column({ name: 'fecha_proxima_dosis', type: 'date', nullable: true })
  fechaProximaDosis: Date | null;

  @Column({ type: 'varchar', nullable: true })
  lote: string;

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
