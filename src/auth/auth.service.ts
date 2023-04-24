import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/helper/hash.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    try {
      const user = await this.usersService.findOne(email);

      if (user) {
        const checkIfCorrectPassword = await this.hashService.comparePassword(
          pass,
          user.password,
        );
        if (!checkIfCorrectPassword) {
          throw new UnauthorizedException('Invalid credential!');
        }
        const { password, ...results } = user;
        return results;
      } else {
        throw new UnauthorizedException('Invalid credential!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      }),
      role: user.role,
    };
  }
}
