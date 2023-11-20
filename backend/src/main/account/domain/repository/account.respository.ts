import { IRepository } from 'src/common/interface/repository/irespository.interface';
import { AccountEntity } from 'src/models/accounts.entity';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

export class AccountRepository
  implements IRepository<AccountEntity, CreateAccountDto, UpdateAccountDto>
{
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepo: Repository<AccountEntity>,
  ) {}

  async delete(id: string): Promise<UpdateResult> {
    try {
      return await this.accountRepo.softDelete(id);
    } catch (e) {
      throw e;
    }
  }

  async findAll(params?: any): Promise<AccountEntity[] | []> {
    try {
      return await this.accountRepo.find({
        relations: ['category'],
      });
    } catch (e) {
      throw [];
    }
  }

  async update(id: string, params: UpdateAccountDto): Promise<AccountEntity> {
    try {
      await this.accountRepo.update({ accountId: id }, { ...params });
      return await this.findById(id);
    } catch (e) {
      throw e;
    }
  }

  async findById(id: string): Promise<AccountEntity> {
    try {
      return await this.accountRepo.findOne({
        where: { accountId: id },
        relations: ['category'],
      });
    } catch (e) {
      throw e;
    }
  }

  async create(params: CreateAccountDto): Promise<AccountEntity> {
    try {
      const newAccount = this.accountRepo.create({
        ...params,
        category: { categoryId: params.categoryId },
      });
      return await this.accountRepo.save(newAccount);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Duplicate account name');
    }
  }
}
