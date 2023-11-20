import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAccount } from './domain/interface/iaccount.interface';
import { AccountEntity } from 'src/models/accounts.entity';
import { CreateAccountDto } from './domain/dto/create-account.dto';
import { UpdateAccountDto } from './domain/dto/update-account.dto';
import { IRepository } from 'src/common/interface/repository/irespository.interface';
import { UpdateResult } from 'typeorm';
import { MailService, SendMailParams } from 'src/mail/mail.service';
import { configService as config } from '../../common/config/config-service';

@Injectable()
export class AccountService implements IAccount {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    private readonly mailService: MailService,
    @Inject('IAccountRepository')
    private readonly AccountRepo: IRepository<
      AccountEntity,
      CreateAccountDto,
      UpdateAccountDto
    >,
  ) {}

  async deleteAccount(id: string): Promise<UpdateResult> {
    try {
      return await this.AccountRepo.delete(id);
    } catch (e) {
      this.logger.error('Failed to delete Account', e);
      throw e;
    }
  }

  async getAccount(id: string): Promise<AccountEntity> {
    try {
      return await this.AccountRepo.findById(id);
    } catch (e) {
      this.logger.error('Failed to retrieve Account', e);
      throw e;
    }
  }

  async listAccounts(params?: any): Promise<AccountEntity[] | []> {
    try {
      return await this.AccountRepo.findAll(params);
    } catch (e) {
      this.logger.error('Failed to get the list of accounts');
      throw e;
    }
  }

  async updateAccount(
    id: string,
    params: UpdateAccountDto,
  ): Promise<AccountEntity> {
    try {
      const Account = await this.AccountRepo.findById(id);
      if (Account) {
        return await this.AccountRepo.update(id, params);
      }
    } catch (e) {
      this.logger.error('Failed to update Account', e);
      throw e;
    }
  }

  async addAccount(params: CreateAccountDto): Promise<AccountEntity> {
    try {
      const data = await this.AccountRepo.create(params);
      await this.AccountRepo.findById(data.accountId).then(
        async (newAccount) => {
          const mailData: SendMailParams = {
            to: config.get('SMTP_TO'),
            from: 'noreply@company.com',
            subject: 'New Income/Expense',
            template: './new-account',
            context: {
              accountType: newAccount.accountType,
              amount: newAccount.amount.toFixed(2),
              date: newAccount.date.toISOString(),
              description: newAccount.description,
              category: newAccount.category.name,
            },
          };

          try {
            await this.mailService.sendMail(mailData);
          } catch (e) {
            this.logger.error('Failed to send new account email', e);
          }
        },
      );

      return data;
    } catch (e) {
      this.logger.error('Failed to add new Account', e);
      throw e;
    }
  }
}
