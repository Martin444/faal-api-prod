import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateProduct } from 'src/products/dto/product.dto';
import { CreateAddress } from 'src/user/dto/address.dto';

export class CreateOrder {
    @IsString()
    @ApiProperty({ isArray: true })
    readonly products: CreateProduct[];

    @IsString()
    @ApiProperty()
    readonly address: CreateAddress;

    @IsString()
    @ApiProperty()
    readonly deliveryType: string;

    @IsString()
    @ApiProperty()
    readonly pymentType: string;

    @IsNumber()
    @ApiProperty()
    readonly amount: number;

    @IsString()
    @ApiProperty()
    readonly status: string;
}
