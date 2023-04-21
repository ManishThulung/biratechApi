import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/helper/hash.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AuthService,
    UsersService,
    HashService,
    JwtService,
    LocalStrategy,
    JwtGuard,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
