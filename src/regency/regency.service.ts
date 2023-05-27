import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegencyDto } from './dto/create-regency.dto';
import { UpdateRegencyDto } from './dto/update-regency.dto';
import { Regency } from './entities/regency.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from 'src/province/entities/province.entity';
import { ResponseRegencyDto } from './dto/response-regency.dto';
import { ResponseTransformer } from 'src/utils/ResponseTransformer';
import { FindRegencyDto } from './dto/find-regency.dto';

@Injectable()
export class RegencyService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,

    @InjectRepository(Regency)
    private regencyRepository: Repository<Regency>,

    private responseTransform: ResponseTransformer,
  ) {}

  async create({
    name,
    provinceId,
  }: CreateRegencyDto): Promise<ResponseRegencyDto> {
    const province: Province = await this.isProvinceExist(provinceId);
    const regency = { name, province };

    return this.responseTransform.regency(
      await this.regencyRepository.save(regency),
    );
  }

  async findAll({ name }: FindRegencyDto): Promise<ResponseRegencyDto[]> {
    const where: FindOptionsWhere<Regency> = {};
    if (name) where.name = Like(`%${name}%`);
    const regencies: Regency[] = await this.regencyRepository.find({
      relations: ['province'],
      where,
    });

    return regencies.reduce(
      (acc, regency) => acc.concat(this.responseTransform.regency(regency)),
      [],
    );
  }

  async findByProvince(provinceId: number): Promise<ResponseRegencyDto[]> {
    const regencies: Regency[] = await this.regencyRepository.find({
      where: { province: { id: provinceId } },
      relations: ['province'],
    });

    return regencies.reduce(
      (acc, regency) => acc.concat(this.responseTransform.regency(regency)),
      [],
    );
  }

  async findOne(id: number): Promise<ResponseRegencyDto> {
    return this.responseTransform.regency(await this.isRegencyExist(id));
  }

  async update(
    id: number,
    { name, provinceId }: UpdateRegencyDto,
  ): Promise<ResponseRegencyDto> {
    await this.isRegencyExist(id);
    const province = await this.isProvinceExist(provinceId);
    await this.regencyRepository.update(id, {
      name,
      province,
    });

    return this.responseTransform.regency(
      await this.regencyRepository.findOne({
        where: { id },
        relations: ['province'],
      }),
    );
  }

  async remove(id: number): Promise<ResponseRegencyDto> {
    const regency: Regency = await this.isRegencyExist(id);
    await this.regencyRepository.delete(id);
    return this.responseTransform.regency(regency);
  }

  private async isProvinceExist(id: number): Promise<Province> {
    const province: Province = await this.provinceRepository.findOneBy({ id });
    if (!province)
      throw new HttpException(
        `Provinsi tidak ditemukan`,
        HttpStatus.BAD_REQUEST,
      );

    return province;
  }

  private async isRegencyExist(id: number): Promise<Regency> {
    const regency: Regency = await this.regencyRepository.findOne({
      where: { id },
      relations: ['province'],
    });

    if (!regency)
      throw new HttpException(
        `Kota/Kabupaten tidak ditemukan`,
        HttpStatus.BAD_REQUEST,
      );

    return regency;
  }
}
