import { IsNotEmpty, MinLength } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';

export class phoneDto {
  @IsNotEmpty()
  @MinLength(3)
  company: string;

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

  author: UserEntity;
}
