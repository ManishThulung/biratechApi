import { IsNotEmpty, MinLength } from 'class-validator';
import { PhoneEntity } from 'src/entity/phone.entity';

export class ReviewDto {
  @IsNotEmpty()
  @MinLength(5)
  review: string;

  // phoneId: PhoneEntity;
}
