import { Injectable } from '@nestjs/common';
import { ResponseProvinceDto } from 'src/province/dto/response-province.dto';
import { Province } from 'src/province/entities/province.entity';
import { ResponseRegencyDto } from 'src/regency/dto/response-regency.dto';
import { Regency } from 'src/regency/entities/regency.entity';
import { ResponseSubdistrictDto } from 'src/subdistrict/dto/response-subdistrict.dto';
import { Subdistrict } from 'src/subdistrict/entities/subdistrict.entity';

@Injectable()
export class ResponseTransformer {
  constructor() {}

  province({ id, name }: Province): ResponseProvinceDto {
    return { id, name };
  }

  regency({ id, name, province }: Regency): ResponseRegencyDto {
    return { id, name, province: province.name };
  }

  subdistrict({
    id,
    name,
    regency,
    province,
  }: Subdistrict): ResponseSubdistrictDto {
    return { id, name, regency: regency.name, province: province.name };
  }
}
