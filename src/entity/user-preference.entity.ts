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

  @Column({ nullable: true })
  company: string;

  @Column('integer', { nullable: true })
  price: number;

  @Column({ nullable: true })
  memory: string;

  @Column({ nullable: true })
  camera: string;

  @Column({ nullable: true })
  battery: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
