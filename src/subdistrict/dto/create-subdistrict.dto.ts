import { IsString, IsNumber } from 'class-validator';

export class CreateSubdistrictDto {
  @IsString()
  name: string;

  @IsNumber()
  regencyId: number;

  @IsNumber()
  provinceId: number;
}
