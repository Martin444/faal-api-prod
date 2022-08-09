import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateOrder } from '../dto/order.dto';
import { OrdersService } from '../services/orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get('/myorders')
    async myOrders(@Req() req: Request) {
        return this.ordersService.getAllMyOrders(req['user']['userId']);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getOrder(@Param('id') id: string, @Req() req: Request) {
        return this.ordersService.getCompleteOrder(id, req['user']['userId']);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createOrder(@Body() orderin: CreateOrder, @Req() req: Request) {
        return this.ordersService.createOrder(orderin, req['user']['userId']);
    }
}
