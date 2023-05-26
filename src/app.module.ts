import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceModule } from './province/province.module';
import { Province } from './province/entities/province.entity';
import { RegencyModule } from './regency/regency.module';
import { SubdistrictModule } from './subdistrict/subdistrict.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'indonesia',
      synchronize: true,
      dropSchema: false,
      logging: 'all',
      autoLoadEntities: true,
      entities: [Province],
    }),
    ProvinceModule,
    RegencyModule,
    SubdistrictModule,
  ],
})
export class AppModule {}
