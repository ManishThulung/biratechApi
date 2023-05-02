import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_preference')
export class UserPreferenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { nullable: true, array: true })
  company: string[];

  @Column('integer', { nullable: true, array: true })
  price: number[];

  @Column('simple-array', { nullable: true, array: true })
  memory: string[];

  @Column('simple-array', { nullable: true, array: true })
  camera: string[];

  @Column('simple-array', { nullable: true, array: true })
  battery: string[];

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
