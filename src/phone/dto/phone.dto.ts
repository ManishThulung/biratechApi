import { IsNotEmpty, MinLength } from 'class-validator';
import { RatingEntity } from 'src/entity/rating.entity';
import { ReviewEntity } from 'src/entity/review.entity';
import { UserEntity } from 'src/entity/user.entity';

export class phoneDto {
  // @IsNotEmpty()
  // @MinLength(3)
  // company: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  camera: string;

  @IsNotEmpty()
  @MinLength(3)
  battery: string;

  @IsNotEmpty()
  @MinLength(3)
  memory: string;

  // @IsNotEmpty()
  photo: string;

  ratings?: RatingEntity[];

  author: UserEntity;

  review: ReviewEntity;
}
