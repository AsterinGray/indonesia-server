import { IsOptional, IsString } from 'class-validator';

export class FindProvinceDto {
  @IsString()
  @IsOptional()
  name: string;
}
