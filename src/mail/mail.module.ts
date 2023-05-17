import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          port: 587,
          secure: false,
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('EMAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  // imports: [
  //   MailerModule.forRoot({
  //     transport: {
  //       host: 'smtp.sendgrid.net',
  //       secure: false,
  //       auth: {
  //         user: 'apikey',
  //         pass: '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',
  //       },
  //     },
  //     template: {
  //       dir: join(__dirname, './templates'),
  //       adapter: new HandlebarsAdapter(),
  //       options: {
  //         strict: true,
  //       },
  //     },
  //   }),
  // ],
  providers: [MailService],
})
export class MailModule {}
