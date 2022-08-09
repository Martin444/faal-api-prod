import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    constructor(
        // private configService: ConfigType<typeof config>,
        private httpService: HttpService,
    ) {}

    async getoneListProduct(page: string): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                this.httpService
                    .get(
                        `https://faalsrl.com.ar/wp-json/wc/v3/products?page=${page}&orderby=popularity&per_page=20`,
                        {
                            auth: {
                                username: process.env.WP_USER,
                                password: process.env.WP_PASSWORD,
                            },
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    )
                    .subscribe(
                        (data) => {
                            resolve(data.data);
                        },
                        (error) => {
                            reject(error);
                        },
                    );
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPromotions(): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                this.httpService
                    .get(
                        `https://faalsrl.com.ar/wp-json/wc/v3/products?search=promo`,
                        {
                            auth: {
                                username: process.env.WP_USER,
                                password: process.env.WP_PASSWORD,
                            },
                        },
                    )
                    .subscribe(
                        (data) => {
                            resolve(data.data);
                        },
                        (error) => {
                            reject(error);
                        },
                    );
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async searchProducts(search: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpService
                .get(
                    `https://faalsrl.com.ar/wp-json/wc/v3/products?search=${search}`,
                    {
                        auth: {
                            username: process.env.WP_USER,
                            password: process.env.WP_PASSWORD,
                        },
                    },
                )
                .subscribe(
                    (data) => {
                        resolve(data.data);
                    },
                    (error) => {
                        reject(error);
                    },
                );
        });
    }

    async getProductsearchers(search: string) {
        const response = await this.searchProducts(search);
        const prods = [];
        response.forEach((element) => {
            const imagesin = [];
            const categoriesin = [];
            element.images.forEach((img) => {
                imagesin.push(img.src);
            });

            element.categories.forEach((cat) => {
                categoriesin.push(cat.name);
            });
            const newPr = {
                id: element.id,
                name: element.name,
                price: element.price ?? 0,
                regular_price: element.regular_price ?? 0,
                sale_price: element.sale_price ?? 0,
                categories: categoriesin,
                images: imagesin,
            };
            prods.push(newPr);
        });
        return prods;
    }

    async getOfers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpService
                .get(
                    `https://faalsrl.com.ar/wp-json/wc/v3/products?search=oferta`,
                    {
                        auth: {
                            username: process.env.WP_USER,
                            password: process.env.WP_PASSWORD,
                        },
                    },
                )
                .subscribe(
                    (data) => {
                        resolve(data.data);
                    },
                    (error) => {
                        reject(error);
                    },
                );
        });
    }

    async getAllProducts(page: string) {
        try {
            const respon = await this.getoneListProduct(page);
            const prods = [];
            respon.forEach((element) => {
                const imagesin = [];
                const categoriesin = [];
                element.images.forEach((img) => {
                    imagesin.push(img.src);
                });
                element.categories.forEach((cat) => {
                    categoriesin.push(cat.name);
                });
                const newPr = {
                    id: element.id,
                    name: element.name,
                    price: element.price ?? 0,
                    regular_price: element.regular_price ?? 0,
                    sale_price: element.sale_price ?? 0,
                    categories: categoriesin,
                    images: imagesin,
                };
                prods.push(newPr);
            });
            return prods;
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

    async getAllPromotionsAndOfert() {
        try {
            const promotions = await this.getPromotions();
            const ofets = await this.getOfers();
            const proms = [];
            const ofers = [];

            promotions.forEach((element) => {
                const imagesin = [];
                const categoriesin = [];
                element.images.forEach((img) => {
                    imagesin.push(img.src);
                });

                element.categories.forEach((cat) => {
                    categoriesin.push(cat.name);
                });
                const newPr = {
                    id: element.id,
                    name: element.name,
                    price: element.price ?? 0,
                    regular_price: element.regular_price ?? 0,
                    sale_price: element.sale_price ?? 0,
                    categories: categoriesin,
                    images: imagesin,
                };
                proms.push(newPr);
            });

            ofets.forEach((element) => {
                const imagesin = [];
                const categoriesin = [];
                element.images.forEach((img) => {
                    imagesin.push(img.src);
                });

                element.categories.forEach((cat) => {
                    categoriesin.push(cat.name);
                });
                const newPr = {
                    id: element.id,
                    name: element.name,
                    price: element.price ?? 0,
                    regular_price: element.regular_price ?? 0,
                    sale_price: element.sale_price ?? 0,
                    categories: categoriesin,
                    images: imagesin,
                };
                ofers.push(newPr);
            });

            return [...proms, ...ofers];
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

    // Categories
    async getProductByCategory(idCat: string): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                this.httpService
                    .get(
                        `https://faalsrl.com.ar/wp-json/wc/v3/products?category=${idCat}&per_page=30`,
                        {
                            auth: {
                                username: process.env.WP_USER,
                                password: process.env.WP_PASSWORD,
                            },
                        },
                    )
                    .subscribe(
                        (data) => {
                            resolve(data.data);
                        },
                        (error) => {
                            reject(error);
                        },
                    );
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async productsByCategory(id: string) {
        try {
            const respon = await this.getProductByCategory(id);
            const prods = [];
            respon.forEach((element) => {
                const imagesin = [];
                const categoriesin = [];
                element.images.forEach((img) => {
                    imagesin.push(img.src);
                });

                element.categories.forEach((cat) => {
                    categoriesin.push(cat.name);
                });
                const newPr = {
                    id: element.id,
                    name: element.name,
                    price: element.price ?? 0,
                    regular_price: element.regular_price ?? 0,
                    sale_price: element.sale_price ?? 0,
                    categories: categoriesin,
                    images: imagesin,
                };
                prods.push(newPr);
            });
            return prods;
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}
