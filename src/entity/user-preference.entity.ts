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
  company: Array<string>;

  @Column({ nullable: true })
  price: Array<number>;

  @Column({ nullable: true })
  memory: Array<string>;

  @Column({ nullable: true })
  camera: Array<string>;

  @Column({ nullable: true })
  battery: Array<string>;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
