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

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.userService.findOne(id);
    // }

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

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
