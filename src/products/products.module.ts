import { Global, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
    imports: [HttpModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
