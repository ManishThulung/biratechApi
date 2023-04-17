import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/entity/phone.entity';
import { Repository } from 'typeorm';
import { phoneDto } from './dto/phone.dto';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private phoneRepository: Repository<PhoneEntity>,
  ) {}

  getPhones() {
    return this.phoneRepository.find();
  }

  async newPhone(phone: phoneDto) {
    try {
      await this.phoneRepository.save(phone);
      return 'Phone added seccessfully';
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
      return 'Phone added seccessfully';
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }
}
