import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('/page/:page')
    async getProducts(@Param('page') page: string) {
        return await this.productsService.getAllProducts(page);
    }

    @Get('/ofers')
    async getOferts() {
        return await this.productsService.getAllPromotionsAndOfert();
    }

    @Post('/search/:search')
    async postSearch(@Param('search') search: string) {
        return await this.productsService.getProductsearchers(search);
    }

    @Post('/bycategorie/:categorie')
    async postbyCategorie(@Param('categorie') id: string) {
        return await this.productsService.productsByCategory(id);
    }

    @Post('/relationate/:id')
    async prodByRelatins(@Param('id') id: string) {
        return await this.productsService.productsRelationated(id);
    }
}
