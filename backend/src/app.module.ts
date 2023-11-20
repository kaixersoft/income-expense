import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './common/config/typeorm.config';
import { DataSource } from 'typeorm';
import { AccountController } from './main/account/account.controller';
import { CategoryController } from './main/category/category.controller';
import { IAccount } from './main/account/domain/interface/iaccount.interface';
import { AccountService } from './main/account/account.service';
import { ICategory } from './main/category/domain/interface/icategory.interface';
import { CategoryService } from './main/category/category.service';
import { CategoryRepository } from './main/category/domain/repository/category.respository';
import { CategoryEntity } from './models/category.entity';
import { AccountEntity } from './models/accounts.entity';
import { IRepository } from './common/interface/repository/irespository.interface';
import { AccountRepository } from './main/account/domain/repository/account.respository';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Add all model you will use in your repository for this module
      CategoryEntity,
      AccountEntity,
    ]),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    MailModule,
  ],
  controllers: [AccountController, CategoryController],
  providers: [
    { provide: IAccount, useClass: AccountService },
    { provide: ICategory, useClass: CategoryService },
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
      useExisting: IRepository,
    },
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
      useExisting: IRepository,
    },
    MailService,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
