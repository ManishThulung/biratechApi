import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReviewEntity } from './review.entity';

@Entity('phones')
export class PhoneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  name: string;

  @Column()
  camera: string;

  @Column()
  memory: string;

  @Column()
  battery: string;

  @Column({ nullable: true })
  photo: string;

  @OneToOne(() => ReviewEntity)
  @JoinColumn()
  review: ReviewEntity;

  @ManyToOne(() => UserEntity, (user) => user.phones)
  author: UserEntity;
}
