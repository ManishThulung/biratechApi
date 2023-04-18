import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/user.dto';
import { HashService } from 'src/helper/hash.service';
import { UpdateUser } from './utils/type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashService: HashService,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  findOne(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async registerUser(user: RegisterDto) {
    try {
      const { password, name, email } = user;

      const hashPassword = await this.hashService.hashPassword(password);

      await this.userRepository.save({ password: hashPassword, name, email });
      return 'User Registered';
    } catch (error) {
      throw new HttpException('Error occurred!', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: number, userDetail: UpdateUser) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      if (!user) throw new UnprocessableEntityException('User not found!');
      await this.userRepository.update(id, userDetail);
      return 'User updated successfully';
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      if (!user) throw new UnprocessableEntityException('User not found!');
      await this.userRepository.delete(id);
      return 'User deleted successfully';
    } catch (error) {
      console.log(error);
    }
  }
}
