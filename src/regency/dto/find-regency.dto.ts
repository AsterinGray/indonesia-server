import { IsOptional, IsString } from 'class-validator';

export class FindRegencyDto {
  @IsString()
  @IsOptional()
  name: string;
}
