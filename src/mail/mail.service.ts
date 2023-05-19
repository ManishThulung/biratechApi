import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/utils/user.type';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(newUser: User) {
    const url = `${process.env.BASE_URL}/users/verify/${newUser.verify_token}`;
    await this.mailerService.sendMail({
      to: newUser.email,
      from: 'biratechinfo@gmail.com',
      subject: 'Confirm your Email',
      template: './confirmation',
      context: {
        name: newUser.name,
        url,
      },
    });
  }
}
