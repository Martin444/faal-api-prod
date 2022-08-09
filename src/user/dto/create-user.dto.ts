import {
    IsString,
    IsNotEmpty,
    IsEmail,
    Length,
    IsPositive,
    IsOptional,
    IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'photoUrl of user' })
    readonly id: string;

    @IsString()
    @ApiProperty({ description: 'photoUrl of user' })
    readonly photoURL: string;

    @IsArray()
    @ApiProperty({ description: 'document photourls of user' })
    readonly photoDNI: string[];

    @IsString()
    @IsEmail()
    @ApiProperty({ description: 'the email of user' })
    readonly email: string;

    @IsString()
    @IsEmail()
    @ApiProperty({ description: 'the name of user' })
    readonly name: string;

    @IsString()
    @ApiProperty({ description: 'the number phone' })
    readonly phone: string;

    @IsString()
    @IsNotEmpty()
    @Length(6)
    @ApiProperty({ description: 'the password of user' })
    readonly password: string;

    @IsNotEmpty()
    readonly role: string;

    @IsOptional()
    @IsPositive()
    @ApiProperty()
    readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
