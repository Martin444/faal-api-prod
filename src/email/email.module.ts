import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'mail.faalsrl.com.ar',
        port: 465,
        secure: true, // true for 465, false for other ports
       
        auth: {
          user: 'ventas@faalsrl.com.ar', // generated ethereal user
          pass: 'vfaalsrl2020' // generated ethereal password
        },
      },
      defaults: {
        from: '"Ventas" <ventas@faalsrl.com.ar>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
