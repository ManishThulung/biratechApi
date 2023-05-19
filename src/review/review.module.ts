import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/entity/review.entity';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/entity/user.entity';
import { HashService } from 'src/helper/hash.service';
import { PhoneService } from 'src/phone/phone.service';
import { PhoneEntity } from 'src/entity/phone.entity';
import { MailService } from 'src/mail/mail.service';
import { CompanyEntity } from 'src/entity/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      UserEntity,
      PhoneEntity,
      CompanyEntity,
    ]),
  ],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    JwtGuard,
    UsersService,
    HashService,
    PhoneService,
    MailService,
  ],
})
export class ReviewModule {}
