import { IsOptional, IsString } from 'class-validator';

export class FindSubdistrictDto {
  @IsString()
  @IsOptional()
  name: string;
}
