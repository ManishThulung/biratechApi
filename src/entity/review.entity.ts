import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhoneEntity } from './phone.entity';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  review: string;

  // @OneToOne(() => PhoneEntity)
  // @JoinColumn()
  // phone: PhoneEntity;
}
