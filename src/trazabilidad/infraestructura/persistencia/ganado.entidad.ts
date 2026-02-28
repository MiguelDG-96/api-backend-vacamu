import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { UsuarioEntidad } from '../../../administracion/infraestructura/persistencia/usuario.entidad'; // Cross-module reference at infra level is acceptable or use ID only

@Entity('ganado')
@Index(['usuarioId', 'numeroIdentificacion'], { unique: true }) // ID único por usuario
export class GanadoEntidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'numero_identificacion' })
  numeroIdentificacion: string;

  @Column({ name: 'rfid_tag', type: 'varchar', nullable: true })
  rfidTag: string | null;

  @Column({ type: 'varchar', nullable: true })
  nombre: string | null;

  @Column()
  raza: string;

  @Column()
  sexo: string; // 'MACHO' | 'HEMBRA'

  @Column({ name: 'fecha_nacimiento', type: 'date' })
  fechaNacimiento: Date;

  @Column({ name: 'peso_actual', type: 'decimal', precision: 10, scale: 2, default: 0 })
  pesoActual: number;

  @Column({ default: 'ACTIVO' })
  estado: string;

  @Column({ default: 'LECHE' })
  proposito: string;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @ManyToOne(() => UsuarioEntidad)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntidad;

  // Genealogía (Self referencing)
  @Column({ name: 'madre_id', nullable: true })
  madreId: string | null;

  @ManyToOne(() => GanadoEntidad, { nullable: true })
  @JoinColumn({ name: 'madre_id' })
  madre: GanadoEntidad | null;

  @Column({ name: 'padre_id', nullable: true })
  padreId: string | null;

  @ManyToOne(() => GanadoEntidad, { nullable: true })
  @JoinColumn({ name: 'padre_id' })
  padre: GanadoEntidad | null;

  // Ubicación simple por ahora (IDs)
  @Column({ name: 'lote_id', type: 'varchar', nullable: true })
  loteId: string | null;

  @Column({ name: 'potrero_id', type: 'varchar', nullable: true })
  potreroId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  fechaRegistro: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
