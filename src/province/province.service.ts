import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, FindOptionsWhere } from 'typeorm';

import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province } from './entities/province.entity';
import { ResponseProvinceDto } from './dto/response-province.dto';
import { FindProvinceDto } from './dto/find-province.dto';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) {}

  create(data: CreateProvinceDto): Promise<ResponseProvinceDto> {
    return this.provinceRepository.save(data);
  }

  findAll({ name }: FindProvinceDto): Promise<ResponseProvinceDto[]> {
    const where: FindOptionsWhere<Province> = {};
    if (name) where.name = Like(`%${name}%`);
    else return this.provinceRepository.find({ where });
  }

  async findOne(id: number): Promise<ResponseProvinceDto> {
    const province = await this.isProvinceExist(id);
    return province;
  }

  async update(
    id: number,
    data: UpdateProvinceDto,
  ): Promise<ResponseProvinceDto> {
    await this.isProvinceExist(id);
    await this.provinceRepository.update(id, data);
    return this.provinceRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<ResponseProvinceDto> {
    const province = await this.isProvinceExist(id);
    await this.provinceRepository.delete(id);
    return province;
  }

  private async isProvinceExist(id: number): Promise<Province> {
    const province = await this.provinceRepository.findOneBy({ id });
    if (!province)
      throw new HttpException(
        `Provinsi tidak ditemukan`,
        HttpStatus.BAD_REQUEST,
      );

    return province;
  }
}
