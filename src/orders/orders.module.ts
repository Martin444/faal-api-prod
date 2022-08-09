import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { HttpModule } from '@nestjs/axios';
import { MercadopagoService } from 'src/mercadopago/mercadopago.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entitys/order.entity';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Orders])],
    controllers: [OrdersController],
    providers: [OrdersService, MercadopagoService],
})
export class OrdersModule {}
