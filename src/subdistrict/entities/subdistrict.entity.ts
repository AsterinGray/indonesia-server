import { Province } from 'src/province/entities/province.entity';
import { Regency } from 'src/regency/entities/regency.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subdistrict {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Regency, (regency) => regency.subdistrict, {
    onDelete: 'CASCADE',
  })
  regency: Regency;

  @ManyToOne(() => Province, (province) => province.subdistrict, {
    onDelete: 'CASCADE',
  })
  province: Province;
}
