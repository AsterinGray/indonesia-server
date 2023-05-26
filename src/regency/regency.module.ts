import { Module } from '@nestjs/common';
import { RegencyService } from './regency.service';
import { RegencyController } from './regency.controller';
import { Regency } from './entities/regency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from 'src/province/entities/province.entity';
import { ResponseTransformer } from 'src/utils/ResponseTransformer';

@Module({
  imports: [TypeOrmModule.forFeature([Regency, Province])],
  controllers: [RegencyController],
  providers: [RegencyService, ResponseTransformer],
})
export class RegencyModule {}
