import { IsString, IsNumber } from 'class-validator';

export class CreateRegencyDto {
  @IsString()
  name: string;

  @IsNumber()
  provinceId: number;
}
