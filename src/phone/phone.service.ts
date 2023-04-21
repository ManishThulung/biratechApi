import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/entity/phone.entity';
import { Repository } from 'typeorm';
import { phoneDto } from './dto/phone.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private phoneRepository: Repository<PhoneEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getPhones() {
    return this.phoneRepository.find();
  }

  getPhoneById(id: number) {
    return this.phoneRepository.findOne({
      where: {
        id,
      },
      relations: ['author'],
    });
  }

  async newPhone(phone: phoneDto, user: any) {
    const { email } = user;

    try {
      const userDetail = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      phone.author = userDetail;

      await this.phoneRepository.save(phone);
      return 'Phone added successfully';
    } catch (error) {
      console.log(error);

      throw new UnprocessableEntityException();
    }
  }
  async updatePhone(id: number, updatePhone: phoneDto) {
    try {
      const phone = await this.phoneRepository.findOne({
        where: {
          id,
        },
      });
      if (!phone) throw new UnprocessableEntityException('Phone not found!');

      await this.phoneRepository.update(id, updatePhone);

      return 'Phone updated seccessfully';
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }
  async deletePhone(id: number) {
    try {
      const phone = await this.phoneRepository.findOne({
        where: {
          id,
        },
      });
      if (!phone) throw new UnprocessableEntityException('Phone not found!');
      await this.phoneRepository.delete(id);
      return 'Phone deleted seccessfully';
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }
}
