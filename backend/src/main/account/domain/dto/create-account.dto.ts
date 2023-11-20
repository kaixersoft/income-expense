import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsDefined()
  @IsString()
  accountType: string;

  @IsDefined()
  @IsNumber()
  amount: number;

  @IsDefined()
  @IsString()
  date: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsString()
  categoryId: string;
}
