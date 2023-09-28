import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/entity/phone.entity';
import { Between, ILike, MoreThan, Repository } from 'typeorm';
import { phoneDto } from './dto/phone.dto';
import { UserEntity } from 'src/entity/user.entity';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Phone } from 'src/utils/phone.type';
import { Observable, from, map } from 'rxjs';
import { CompanyEntity } from 'src/entity/company.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private phoneRepository: Repository<PhoneEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  getPhones() {
    return this.phoneRepository.find();
  }

  async getAllPhonesName() {
    const phones: PhoneEntity[] = await this.phoneRepository.find();
    const phonesNameArray = phones.map((item) => item.name);
    const phonesName = phonesNameArray.map((name) => ({
      value: name,
      label: name,
    }));
    return phonesName;
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
    const minPrice = Number(phone.minPrice) || 20000;
    const maxPrice = Number(phone.maxPrice) || 120000;
    return from(
      this.phoneRepository.findAndCount({
        skip: pageNumber * Number(options.limit) || 0,
        take: Number(options.limit) || 30,
        order: { id: 'ASC' },
        // select: ['id', 'name', 'battery', 'camera', 'memory'],
        where: [
          {
            name: ILike(`%${phone.name}%`),
            memory: ILike(`%${phone.memory}%`),
            // company: ILike(`%${phone.company}%`),
            price: Between(minPrice, maxPrice),
            // price: MoreThanOrEqual(minPrice),
            battery: ILike(`%${phone.battery}%`),
            camera: ILike(`%${phone.camera}%`),
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
      relations: ['author', 'review', 'comments', 'comments.author', 'ratings'],
    });
  }

  // binary search
  async getPhoneByIdBinaySearch(id: number): Promise<PhoneEntity | undefined> {
    let left = 0;
    let right = (await this.phoneRepository.count()) - 1;
    while (left <= right) {
      const middle = Math.floor((left + right) / 2);

      const phone = await this.phoneRepository.findOne({
        where: {
          id: middle,
        },
        relations: ['author', 'review'],
      });

      if (phone && phone.id === id) {
        return phone;
      } else if (phone && phone.id < id) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }

    // return 'Phone not found!';
    return undefined;
  }

  async upcommingPhones(): Promise<Phone[]> {
    const phones = await this.phoneRepository.find({
      where: {
        releaseDate: MoreThan(new Date()),
      },
      order: {
        releaseDate: 'ASC',
      },
      relations: ['review'],
    });

    return phones;
  }

  async gamingPhones(): Promise<Phone[]> {
    const phones = await this.phoneRepository.find({ relations: ['review'] });
    const gamingPhones = phones.map((phone) => {
      const memory = Number(phone.memory.split('G')[0]);
      if (memory < 128) {
        return;
      }
      return phone;
    });
    return gamingPhones.filter(Boolean);
  }

  async trendingPhones(): Promise<Phone[]> {
    const phones = await this.phoneRepository.find({ relations: ['ratings'] });
    const trendingPhones: Phone[] = phones.map((phone): Phone => {
      const totalRatings = phone.ratings.length;
      const sumOfRatings = phone.ratings.reduce(
        (accumulator, rating) => accumulator + rating.value,
        0,
      );
      const overallRating = sumOfRatings / totalRatings;
      if (overallRating <= 3 || isNaN(overallRating)) {
        return;
      }
      return phone;
    });
    return trendingPhones.filter(Boolean);
  }

  async latestPhones(): Promise<Phone[] | any> {
    const currentDate = new Date();
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    const phones = await this.phoneRepository.find({
      where: {
        releaseDate: Between(twoMonthsAgo, currentDate),
      },
    });
    if (phones) {
      return phones;
    } else {
      return { message: 'There are no latest phones available right now' };
    }
  }

  async companyPhones(company: string) {
    const phone = await this.companyRepository.findOne({
      where: { company: ILike(`%${company}%`) },
      relations: ['phone'],
    });

    return phone.phone;
  }
  async similarPhones(phoneName: string) {
    const phone = await this.phoneRepository.findAndCount({
      where: [{ name: ILike(`%${phoneName}%`) }],
    });

    return phone;
  }

  async comparePhone(phoneOne: string, phoneTwo: string) {
    const phone1 = await this.phoneRepository.findOne({
      where: { name: ILike(`%${phoneOne}%`) },
    });
    const phone2 = await this.phoneRepository.findOne({
      where: { name: ILike(`%${phoneTwo}%`) },
    });
    return { phone1, phone2 };
  }

  async newPhone(phone: any, user: any, imageuploadUrl: string) {
    const { email } = user;
    try {
      const userDetail = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      const company = await this.companyRepository.findOne({
        where: {
          company: phone.company,
        },
      });
      phone.author = userDetail;
      phone.photo = imageuploadUrl;
      phone.company = company;
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
