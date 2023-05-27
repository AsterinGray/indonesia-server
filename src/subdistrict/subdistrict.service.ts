import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';
import { Subdistrict } from './entities/subdistrict.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from 'src/province/entities/province.entity';
import { Regency } from 'src/regency/entities/regency.entity';
import { ResponseSubdistrictDto } from './dto/response-subdistrict.dto';
import { ResponseTransformer } from 'src/utils/ResponseTransformer';
import { FindSubdistrictDto } from './dto/find-subdistrict.dto';

@Injectable()
export class SubdistrictService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,

    @InjectRepository(Regency)
    private regencyRepository: Repository<Regency>,

    @InjectRepository(Subdistrict)
    private subdistrictRepository: Repository<Subdistrict>,

    private responseTransformer: ResponseTransformer,
  ) {}

  async create({
    name,
    provinceId,
    regencyId,
  }: CreateSubdistrictDto): Promise<ResponseSubdistrictDto> {
    const province: Province = await this.isProvinceExist(provinceId);
    const regency: Regency = await this.isRegencyExist(regencyId);
    const subdistrict = { name, province, regency };

    return this.responseTransformer.subdistrict(
      await this.subdistrictRepository.save(subdistrict),
    );
  }

  async findAll({
    name,
  }: FindSubdistrictDto): Promise<ResponseSubdistrictDto[]> {
    const where: FindOptionsWhere<Subdistrict> = {};
    if (name) where.name = Like(`%${name}%`);
    const subdistricts: Subdistrict[] = await this.subdistrictRepository.find({
      relations: ['province', 'regency'],
    });

    return subdistricts.reduce(
      (acc, subdistrict) =>
        acc.concat(this.responseTransformer.subdistrict(subdistrict)),
      [],
    );
  }

  async findOne(id: number): Promise<ResponseSubdistrictDto> {
    return this.responseTransformer.subdistrict(
      await this.isSubdistrictExist(id),
    );
  }

  async update(
    id: number,
    { name, provinceId, regencyId }: UpdateSubdistrictDto,
  ): Promise<ResponseSubdistrictDto> {
    await this.isSubdistrictExist(id);
    const province: Province = await this.isProvinceExist(provinceId);
    const regency: Regency = await this.isRegencyExist(regencyId);
    await this.subdistrictRepository.update(id, { name, province, regency });
    return this.responseTransformer.subdistrict(
      await this.subdistrictRepository.findOne({
        where: { id },
        relations: ['province', 'regency'],
      }),
    );
  }

  async remove(id: number): Promise<ResponseSubdistrictDto> {
    const subdistrict: Subdistrict = await this.isSubdistrictExist(id);
    await this.subdistrictRepository.delete(id);
    return this.responseTransformer.subdistrict(subdistrict);
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

  private async isSubdistrictExist(id: number): Promise<Subdistrict> {
    const subdistrict: Subdistrict = await this.subdistrictRepository.findOne({
      where: { id },
      relations: ['province', 'regency'],
    });

    if (!subdistrict)
      throw new HttpException(
        `Kecamatan tidak ditemukan`,
        HttpStatus.BAD_REQUEST,
      );

    return subdistrict;
  }
}
