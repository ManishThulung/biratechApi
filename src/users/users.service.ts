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
import { v4 as uuidv4 } from 'uuid';

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
      const existUser = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      if (existUser && existUser.is_verified) {
        return { message: 'User already exist,Please login instead' };
      }
      const hashPassword = await this.hashService.hashPassword(password);
      const currentTime = Date.now();
      const verifyTime = currentTime + 15 * 60 * 1000;
      const token = uuidv4();

      const newUser = await this.userRepository.save({
        password: hashPassword,
        name,
        email,
        verify_time: verifyTime,
        verify_token: token,
      });
      await this.mailService.sendUserConfirmation(newUser);
      return {
        message:
          'Email Confirmation has been sent to your email address, Plase verify',
      };
    } catch (error) {
      throw new HttpException('Error occurred!', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyUser(token: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          verify_token: token,
        },
      });
      if (!user) throw new UnprocessableEntityException('User not found!');
      if (user.verify_time < Date.now()) {
        throw new UnprocessableEntityException(
          'Verification time exceed, Please register again!',
        );
      }
      user.is_verified = true;
      await this.userRepository.update(user.id, user);
      return 'Your email has been verified, Please login to continue';
    } catch (error) {
      console.log(error);
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
