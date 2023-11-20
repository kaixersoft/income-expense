import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
