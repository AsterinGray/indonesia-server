import { Province } from 'src/province/entities/province.entity';
import { Subdistrict } from 'src/subdistrict/entities/subdistrict.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Regency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Province, (province) => province.regency, {
    onDelete: 'CASCADE',
  })
  province: Province;

  @OneToMany(() => Subdistrict, (subdistrict) => subdistrict.regency, {
    cascade: true,
  })
  subdistrict: Subdistrict;
}
