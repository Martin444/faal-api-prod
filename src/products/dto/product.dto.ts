import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateProduct {
    @IsString()
    @ApiProperty()
    readonly id: string;

    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @ApiProperty()
    readonly price: string;

    @IsString()
    @ApiProperty()
    readonly quantity: string;

    @IsString()
    @ApiProperty()
    readonly sale_price: string;

    @IsArray()
    @ApiProperty({ isArray: true })
    readonly images: string;
}
