// import { UserEntity } from 'src/entity/user.entity';
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
import { CommentEntity } from './comment.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';

@Entity('phones')
export class PhoneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ nullable: true })
  // company: string;

  @Column()
  name: string;

  @Column()
  camera: string;

  @Column()
  memory: string;

  @Column()
  battery: string;

  @Column({ nullable: true })
  display: string;

  @Column({ nullable: true })
  processor: string;

  @Column({ nullable: true })
  os: string;

  @Column({ nullable: true })
  packageContains: string;

  @Column({ nullable: true })
  sensors: string;

  @Column({ nullable: true })
  network: string;

  @Column({ nullable: true })
  securityAuthentication: string;

  @Column({ nullable: true })
  nfc: string;

  @Column()
  price: number;

  @Column({ name: 'release_date', nullable: true, type: 'date' })
  releaseDate: Date;

  @Column({ nullable: true })
  photo: string;

  @ManyToOne(() => CompanyEntity, (company) => company.phone, {
    nullable: true,
  })
  company: string;

  @OneToMany(() => RatingEntity, (rating) => rating.phone)
  ratings: RatingEntity[];

  @OneToOne(() => ReviewEntity)
  @JoinColumn()
  review: ReviewEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.phone)
  comments: CommentEntity[];

  @ManyToOne(() => UserEntity, (user) => user.phones)
  author: UserEntity;
}
