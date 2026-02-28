import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdministracionModulo } from './administracion/administracion.module';
import { TrazabilidadModulo } from './trazabilidad/trazabilidad.module';
import { SanidadModulo } from './sanidad/sanidad.module';
import { ReproduccionModulo } from './reproduccion/reproduccion.module';
import { ProduccionModulo } from './produccion/produccion.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entidad{.ts,.js}'], // Corregido a .entidad
        synchronize: true, // ¡Solo para desarrollo!
      }),
      inject: [ConfigService],
    }),
    AdministracionModulo,
    TrazabilidadModulo,
    SanidadModulo,
    ReproduccionModulo,
    ProduccionModulo,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
