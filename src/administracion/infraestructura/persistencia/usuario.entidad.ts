import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('usuarios')
export class UsuarioEntidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre_completo' })
  nombreCompleto: string;

  @Column({ unique: true })
  email: string;

  // En un sistema real, guardaríamos el hash, no el password plano.
  // Aquí lo omitimos por simplicidad del ejemplo inicial o lo agregamos después.
  @Column({ type: 'varchar', nullable: true }) 
  password?: string;

  @Column({ default: 'GANADERO' })
  rol: string;

  @Column({ name: 'nombre_finca', type: 'varchar', nullable: true })
  nombreFinca: string | null;

  @Column({ name: 'ubicacion_finca', nullable: true, type: 'text' })
  ubicacionFinca: string | null;

  @Column({ name: 'google_id', nullable: true, unique: true })
  googleId: string | null;

  @Column({ name: 'foto_url', nullable: true })
  fotoUrl: string | null;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  fechaRegistro: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  fechaActualizacion: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  fechaEliminacion: Date;
}
