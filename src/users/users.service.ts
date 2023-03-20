import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  async registerUser(user: RegisterDto) {
    try {
      await this.userRepository.save(user);
      return 'User Registered';
    } catch (error) {
      throw new HttpException('Error occurred!', HttpStatus.BAD_REQUEST);
    }
  }
}
