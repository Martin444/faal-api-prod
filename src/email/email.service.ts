import { HttpException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}

    async sendVerificationEmails(toEmail: string, validCode: string) { 
        try {
            const respValidating = await this.mailerService.sendMail({
                to: toEmail,
                from: 'ventas@faalsrl.com.ar', // Senders email address
                subject: 'Código de recuperación de contraseña', // Subject line
                text: `Hola! tu código de recuperación de contraseña es ${validCode}`, // plaintext body
                html: ``, 
            });


            console.log(respValidating);
    
            return respValidating;
        } catch (e) {
            console.log(`Error al enviar un email ${e}`)
            throw new HttpException('Error al enviar email', 304)
        }

    }
}
