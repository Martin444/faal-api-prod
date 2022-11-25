import {
    IsString,
    IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecoveryPasswordDto {
    @IsString()
    @ApiProperty({ description: 'email of user' })
    readonly email: string;

    @IsString()
    @ApiProperty({ description: 'code OPT for recovery' })
    readonly code: string;

}
