import {
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @IsString()
    @ApiProperty({ description: 'email of user' })
    readonly email: string;

    @IsString()
    @ApiProperty({ description: 'code OPT for recovery' })
    readonly newPassword: string;

}
