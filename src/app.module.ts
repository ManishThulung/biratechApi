import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from './helper/hash.service';
import { PhoneModule } from './phone/phone.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { ImageuploadService } from './imageupload/imageupload.service';
import { RecommendationModule } from './recommendation/recommendation.module';
import { MailModule } from './mail/mail.module';
import { RatingModule } from './rating/rating.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    PhoneModule,
    AuthModule,
    ReviewModule,
    RecommendationModule,
    MailModule,
    RatingModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashService, ImageuploadService],
})
export class AppModule {}
