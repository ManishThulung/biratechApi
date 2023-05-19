import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhoneEntity } from './phone.entity';

@Entity('Company')
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @OneToMany(() => PhoneEntity, (phone) => phone.company)
  @JoinColumn()
  phone: PhoneEntity[];
}
