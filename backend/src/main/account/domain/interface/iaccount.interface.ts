import { CategoryEntity } from 'src/models/category.entity';
import { UpdateResult } from 'typeorm';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { AccountEntity } from 'src/models/accounts.entity';
import { CreateAccountDto } from '../dto/create-account.dto';

export abstract class IAccount {
  abstract addAccount(params: CreateAccountDto): Promise<AccountEntity>;

  abstract updateAccount(
    id: string,
    params: UpdateAccountDto,
  ): Promise<AccountEntity>;

  abstract getAccount(id: string): Promise<AccountEntity>;

  abstract deleteAccount(id: string): Promise<UpdateResult>;

  abstract listAccounts(params?: any): Promise<AccountEntity[] | []>;
}
