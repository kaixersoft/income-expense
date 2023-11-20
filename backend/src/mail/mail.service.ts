import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export type SendMailParams = {
  to: string;
  from: string;
  subject: string;
  template: string;
  context: {
    accountType: string;
    amount: string;
    date: string;
    description: string;
    category: string;
  };
};

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMail(params: SendMailParams): Promise<void> {
    const { to, from, subject, template, context } = params;
    await this.mailerService.sendMail({
      to: to,
      from: from,
      subject: subject,
      template: template,
      context: context,
    });
  }
}
