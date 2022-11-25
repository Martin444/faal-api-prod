import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { ChangePasswordDto } from 'src/user/dto/change-password';
import { RecoveryPasswordDto } from 'src/user/dto/recovery-pass';
import { User } from 'src/user/entitys/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private readonly emailService: EmailService,
    ) {}

    async recoveryEmail(email:RecoveryPasswordDto): Promise<any> {
        const user = await this.userRepo.findOne({ where : {email: email.email}});
        if(user) {
            const emailsend = await this.emailService.sendVerificationEmails(email.email, email.code);
            console.log(emailsend)
            return {
                error : false,
                message: 'Correct!',
            };
        } else {
            return {
                error: true,
                message: 'Email no registrado'
            }
        }
    }

    async changePassword(newuser:ChangePasswordDto): Promise<any> {
        const user = await this.userRepo.findOne({ where : {email: newuser.email}});
        const userNewPass = await this.userRepo.findOne({ where : {email: newuser.email}});

        if(userNewPass) {

            const passhash = await bcrypt.hash(newuser.newPassword, 10);
            userNewPass.password = passhash;
            const userNuevo = this.userRepo.merge(user, userNewPass);
            this.userRepo.save(userNuevo);

            return {
                error: false,
                message: 'password change',
            }

        }
    }

}
