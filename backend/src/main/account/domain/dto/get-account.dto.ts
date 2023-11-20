import { IsDefined, IsString, IsUUID } from 'class-validator';

export class GetAccountDto {
  @IsDefined()
  @IsString()
  @IsUUID()
  id: string;
}
