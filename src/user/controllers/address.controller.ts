import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateAddress } from '../dto/address.dto';
import { Request } from 'express';
import { AddressService } from '../services/address.service';

@ApiTags('address')
@Controller('address')
export class AddressController {
    constructor(private addressService: AddressService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAddress(@Req() req: Request) {
        return this.addressService.getAddress(req['user']['userId']);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createAddress(@Body() address: CreateAddress, @Req() req: Request) {
        return this.addressService.createAddresUser(
            address,
            req['user']['userId'],
        );
    }
}
