import { Regency } from 'src/regency/entities/regency.entity';
import { Subdistrict } from 'src/subdistrict/entities/subdistrict.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Regency, (regency) => regency.province, { cascade: true })
  regency: Regency;

  @OneToMany(() => Subdistrict, (subdistrict) => subdistrict.province, {
    cascade: true,
  })
  subdistrict: Subdistrict;
}
