import { DataSource, DataSourceOptions } from 'typeorm';
import { configService as config } from './config-service';

export const connectionSource = new DataSource({
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
  entities: [`./src/models/**.entity{.ts,.js}`],
  migrations: [`./src/migrations/*{.ts,.js}`],
} as DataSourceOptions);
