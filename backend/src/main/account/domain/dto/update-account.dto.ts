import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  accountType: string;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  categoryId: string;
}
