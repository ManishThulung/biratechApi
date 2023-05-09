import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/user.dto';
import { HashService } from 'src/helper/hash.service';
import { UpdateUser } from './utils/type';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashService: HashService,
    private readonly mailService: MailService,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['phones'],
    });
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

      console.log(user, 'before save userService');

      // await this.userRepository.save({ password: hashPassword, name, email });
      console.log(user, 'userService');

      await this.mailService.sendUserConfirmation(user, 'tosdfsdfken');
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
