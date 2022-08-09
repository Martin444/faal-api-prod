import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddress {
    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly id: string;

    @IsString()
    @ApiProperty()
    readonly country: string;

    @IsString()
    @ApiProperty()
    readonly city: string;

    @IsNumber()
    @ApiProperty()
    readonly cpcode: number;

    @IsString()
    @ApiProperty()
    readonly address1: string;
}
