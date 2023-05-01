import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/entity/phone.entity';
import { Repository } from 'typeorm';
import { phoneDto } from './dto/phone.dto';
import { UserEntity } from 'src/entity/user.entity';

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
      relations: ['author', 'review'],
    });
  }

  // binary search
  // async getPhoneById(id: number): Promise<PhoneEntity | undefined> {
  //   let left = 0;
  //   let right = (await this.phoneRepository.count()) - 1;
  //   console.log(right);

  //   while (left <= right) {
  //     const middle = Math.floor((left + right) / 2);

  //     const phone = await this.phoneRepository.findOne({
  //       where: {
  //         id: middle,
  //       },
  //       relations: ['author', 'review'],
  //     });

  //     if (phone && phone.id === id) {
  //       return phone;
  //     } else if (phone && phone.id < id) {
  //       left = middle + 1;
  //     } else {
  //       right = middle - 1;
  //     }
  //   }

  //   // return 'Phone not found!';
  //   return undefined;
  // }

  // phone filter/search
  // async filterPhone(
  //   company: string,
  //   name: string,
  //   storage: string,
  //   ram: string,
  //   battery: string,
  //   camera: string,
  //   price: [number, number],
  // ) {
  //   return { company, name, price };
  // }

  async comparePhone(phoneOne: string, phoneTwo: string) {
    const phone1 = await this.phoneRepository.findOne({
      where: { name: phoneOne },
    });
    const phone2 = await this.phoneRepository.findOne({
      where: { name: phoneTwo },
    });

    return { phone1, phone2 };
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
      // phone.photo = imageuploadUrl;

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
