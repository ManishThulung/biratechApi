import { UserEntity } from 'src/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReviewEntity } from './review.entity';
import { RatingEntity } from './rating.entity';

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

  @Column()
  price: number;

  @Column({ name: 'is_gaming', default: false })
  isGaming: boolean;

  @Column({ name: 'release_date', nullable: true })
  releaseDate: Date;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => RatingEntity, (rating) => rating.phone)
  ratings: RatingEntity[];

  @OneToOne(() => ReviewEntity)
  @JoinColumn()
  review: ReviewEntity;

  @ManyToOne(() => UserEntity, (user) => user.phones)
  author: UserEntity;
}
