import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Param,
  ValidationPipe,
  UsePipes,
  Put,
  Delete,
} from '@nestjs/common';
import { IAccount } from './domain/interface/iaccount.interface';
import { AccountEntity } from 'src/models/accounts.entity';
import { GetAccountDto } from './domain/dto/get-account.dto';
import { CreateAccountDto } from './domain/dto/create-account.dto';
import { UpdateAccountDto } from './domain/dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: IAccount) {}

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteCategory(@Param() param: GetAccountDto) {
    return this.accountService.deleteAccount(param.id);
  }

  @Post()
  async create(@Body() params: CreateAccountDto): Promise<AccountEntity> {
    return await this.accountService.addAccount(params);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getCategory(@Param() param: GetAccountDto): Promise<AccountEntity> {
    const { id } = param;
    return await this.accountService.getAccount(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateCategory(
    @Param() param: GetAccountDto,
    @Body() body: UpdateAccountDto,
  ): Promise<AccountEntity> {
    const { id } = param;
    return await this.accountService.updateAccount(id, body);
  }

  @Get()
  listCategories(@Query() data?: any): Promise<AccountEntity[] | []> {
    return this.accountService.listAccounts(data);
  }
}
