import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { configService as config } from './config-service';

export const MailConfig: TransportType = {
  service: 'gmail',
  host: config.get('SMTP_HOST'),
  port: parseInt(config.get('SMTP_PORT')),
  secure: true,
  auth: {
    user: config.get('SMTP_USER'),
    pass: config.get('SMTP_PWD'),
  },
};
