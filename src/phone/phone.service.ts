import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/entity/phone.entity';
import { ILike, MoreThan, Repository } from 'typeorm';
import { phoneDto } from './dto/phone.dto';
import { UserEntity } from 'src/entity/user.entity';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Phone } from 'src/utils/phone.type';
import { Observable, from, map } from 'rxjs';
import { MoreThanOrEqual } from 'typeorm';

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

  // async paginate(
  //   options: IPaginationOptions,
  // ): Promise<Pagination<PhoneEntity>> {
  //   return paginate<PhoneEntity>(this.phoneRepository, options);
  // }
  paginate(options: IPaginationOptions): Observable<Pagination<Phone>> {
    return from(paginate<PhoneEntity>(this.phoneRepository, options));
  }

  paginateFilterMultipleQueries(
    options: IPaginationOptions,
    phone: Phone,
  ): Observable<Pagination<Phone>> {
    const pageNumber = Number(options.page) - 1;
    const minPrice = Number(phone.price);
    return from(
      this.phoneRepository.findAndCount({
        skip: pageNumber * Number(options.limit) || 0,
        take: Number(options.limit) || 10,
        order: { id: 'ASC' },
        // select: ['id', 'name', 'battery', 'camera', 'memory'],
        where: [
          {
            name: ILike(`%${phone.name}%`),
            memory: ILike(`%${phone.memory}%`),
            company: ILike(`%${phone.company}%`),
            price: MoreThanOrEqual(minPrice),
            // battery: ILike(`%${phone.battery}%`),
            // camera: ILike(`%${phone.camera}%`),
          },
        ],
      }),
    ).pipe(
      map(([phones, totalUsers]) => {
        const phonesPageable: Pagination<Phone> = {
          items: phones,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next:
              options.route +
              `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last:
              options.route +
              `?limit=${options.limit}&page=${Math.ceil(
                totalUsers / Number(options.limit),
              )}`,
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: phones.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalUsers,
            totalPages: Math.ceil(totalUsers / Number(options.limit)),
          },
        };
        return phonesPageable;
      }),
    );
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

  async upcommingPhones(): Promise<Phone[]> {
    const phones = await this.phoneRepository.find({
      where: {
        releaseDate: MoreThan(new Date()),
      },
      order: {
        releaseDate: 'ASC',
      },
    });

    return phones;
  }

  async comparePhone(phoneOne: string, phoneTwo: string) {
    const phone1 = await this.phoneRepository.findOne({
      where: { name: phoneOne },
    });
    const phone2 = await this.phoneRepository.findOne({
      where: { name: phoneTwo },
    });

    return { phone1, phone2 };
  }

  async newPhone(phone: phoneDto, user: any, imageuploadUrl: string) {
    const { email } = user;
    try {
      const userDetail = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      phone.author = userDetail;
      phone.photo = imageuploadUrl;
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
