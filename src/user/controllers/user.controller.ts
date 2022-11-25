import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
    Post,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { PasswordService } from '../services/password/password.service';
import { RecoveryPasswordDto } from '../dto/recovery-pass';
import { ChangePasswordDto } from '../dto/change-password';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly passService: PasswordService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async getProfile(@Req() req: Request) {
        console.log(req['user']['userId'])
        return this.userService.findOne(req['user']['userId']);
    }


    @Post('admin/:email')
    async getAdminUseremail(@Param('email') email: string) {
        return this.userService.getadminUser(email);
    }

    @Post('password')
    async recoveryPassword(@Body() recoveryInfo: RecoveryPasswordDto) {
        return this.passService.recoveryEmail(recoveryInfo);
    }

    @Post('change-password')
    async changePassword(@Body() recoveryInfo: ChangePasswordDto) {
        return this.passService.changePassword(recoveryInfo);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Delete()
    deleteall() {
        return this.userService.deleteAllusers();
    }
}
