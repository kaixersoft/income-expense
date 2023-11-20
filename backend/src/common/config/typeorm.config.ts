import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { configService as config } from './config-service';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      migrationsTableName: 'migrations',
      type: 'postgres',
      host: config.get('POSTGRES_HOST'),
      port: parseInt(config.get('POSTGRES_PORT')),
      username: config.get('POSTGRES_USER'),
      password: config.get('POSTGRES_PASSWORD'),
      database: config.get('POSTGRES_DATABASE'),
      logging: true,
      synchronize: false,
      autoLoadEntities: true,
      entities: [join(__dirname, '..', 'models/**/*.entity.{ts,js}')],
      migrations: [join(__dirname, '..', 'migrations/**/*.entity.{ts,js}')],
    };
  }
}
