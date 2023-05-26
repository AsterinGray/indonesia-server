import { Module } from '@nestjs/common';
import { SubdistrictService } from './subdistrict.service';
import { SubdistrictController } from './subdistrict.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subdistrict } from './entities/subdistrict.entity';
import { Province } from 'src/province/entities/province.entity';
import { Regency } from 'src/regency/entities/regency.entity';
import { ResponseTransformer } from 'src/utils/ResponseTransformer';

@Module({
  imports: [TypeOrmModule.forFeature([Province, Regency, Subdistrict])],
  controllers: [SubdistrictController],
  providers: [SubdistrictService, ResponseTransformer],
})
export class SubdistrictModule {}
