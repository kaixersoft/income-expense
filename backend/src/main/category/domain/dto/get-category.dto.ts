import { IsDefined, IsString, IsUUID } from 'class-validator';

export class GetCategoryDto {
  @IsDefined()
  @IsString()
  @IsUUID()
  id: string;
}
