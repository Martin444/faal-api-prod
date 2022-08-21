import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
    constructor(private httpService: HttpService) {}
    async getAllCategories(page: string) {
        try {
            return new Promise((resolve, reject) =>
                this.httpService
                    .get(
                        `https://faalsrl.com.ar/wp-json/wc/v3/products/categories?per_page=30&page=${page}`,
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
                    .subscribe((data) => {
                        try {
                            const categories = [];
                            if (data.data.length != 0) {
                                data.data.forEach((element: any) => {
                                    console.log(element);
                                    const newCat = {
                                        id: element.id,
                                        name: element.name,
                                        slug: element.slug,
                                        description: element.description,
                                        image:
                                            element.image == null
                                                ? ''
                                                : element.image.src,
                                    };
                                    categories.push(newCat);
                                });
                                resolve(categories);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    }),
            );
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
