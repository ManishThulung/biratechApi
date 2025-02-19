import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/helper/hash.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
  ],
  providers: [
    AuthService,
    UsersService,
    HashService,
    JwtService,
    LocalStrategy,
    JwtGuard,
    JwtStrategy,
    MailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
