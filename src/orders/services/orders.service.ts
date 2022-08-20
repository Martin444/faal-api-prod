import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MercadopagoService } from 'src/mercadopago/mercadopago.service';
import { UserService } from 'src/user/user.service';
import { CreateOrder } from '../dto/order.dto';
import { Orders } from '../entitys/order.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from 'src/user/services/address.service';
import { Address } from 'src/user/entitys/address.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders) private orderRepo: Repository<Orders>,
        private userService: UserService,
        private addressService: AddressService,
        private httpService: HttpService,
        private mpService: MercadopagoService,
    ) {}

    async createOrder(orderin: CreateOrder, owner: string) {
        try {
            const user = await this.userService.findOne(owner);
            if (orderin.pymentType === 'Mercado pago') {
                const preferenceID = await this.mpService.createPreference(
                    orderin,
                    user,
                );
                const newOr = await this.postOrderAPI(orderin, user);
                const newLocalOrder = await this.postOrderLocal(
                    orderin,
                    user,
                    newOr.id,
                );
                return {
                    status: 'waiting',
                    prefenceID: preferenceID,
                    orderId: newLocalOrder.id,
                };
            } else {
                const newOr = await this.postOrderAPI(orderin, user);
                const newLocalOrder = await this.postOrderLocal(
                    orderin,
                    user,
                    newOr.id,
                );
                return {
                    status: 'ok',
                    orderId: newLocalOrder.id,
                };
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async postOrderLocal(or: CreateOrder, user: any, idOrderWoo: string) {
        const data: Orders = {
            id: uuidv4(),
            ownerId: user.id,
            addressId: or.address.id,
            woorderId: idOrderWoo,
            amount: or.amount.toString(),
            createAt: new Date(),
            updateAt: new Date(),
        };

        const newArt = await this.orderRepo.create(data);
        await this.orderRepo.save(newArt);
        return await this.orderRepo.save(newArt);
    }

    async postOrderAPI(or: CreateOrder, user: any): Promise<any> {
        try {
            let prods = [];
            or.products.forEach((element) => {
                prods = [
                    ...prods,
                    {
                        product_id: element.id,
                        quantity: element.quantity,
                    },
                ];
            });
            const data = {
                payment_method: 'bacs',
                payment_method_title: or.pymentType,
                set_paid: false,
                billing: {
                    first_name: user.name,
                    last_name: '',
                    address_1: or.address.address1,
                    address_2: '',
                    city: or.address.city,
                    state: '',
                    postcode: or.address.cpcode,
                    country: or.address.country,
                    email: user.email,
                    phone: '',
                },
                shipping: {
                    first_name: user.name,
                    last_name: '',
                    address_1: or.address.address1,
                    address_2: '',
                    city: or.address.city,
                    state: '',
                    postcode: or.address.cpcode,
                    country: or.address.country,
                },
                line_items: [...prods],
                shipping_lines: [
                    {
                        method_id: 'flat_rate',
                        method_title: or.deliveryType,
                        total: `${or.amount}`,
                    },
                ],
            };
            return new Promise((resolve, reject) => {
                this.httpService
                    .post(`https://faalsrl.com.ar/wp-json/wc/v3/orders`, data, {
                        auth: {
                            username: process.env.WP_USER,
                            password: process.env.WP_PASSWORD,
                        },
                    })
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

    async deleteOrderAPI(or: number): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                this.httpService
                    .delete(
                        `https://faalsrl.com.ar/wp-json/wc/v3/orders/${or}`,
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

    async updateStatusOrderAPI(or: number, status: string): Promise<any> {
        try {
            const data = {
                status: status,
            };
            return new Promise((resolve, reject) => {
                this.httpService
                    .put(
                        `https://faalsrl.com.ar/wp-json/wc/v3/orders/${or}`,
                        data,
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

    async getOrderAPI(or: string): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                this.httpService
                    .get(`https://faalsrl.com.ar/wp-json/wc/v3/orders/${or}`, {
                        auth: {
                            username: process.env.WP_USER,
                            password: process.env.WP_PASSWORD,
                        },
                    })
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

    async getOrderLocal(orId: string, userId: string): Promise<Orders> {
        try {
            console.log(userId);
            return await this.orderRepo.findOne({ where: { id: orId } });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCompleteOrder(orId: string, userId: string) {
        try {
            const user = await this.userService.findOne(userId);
            const orderLocal = await this.getOrderLocal(orId, userId);
            const orderAPI = await this.getOrderAPI(orderLocal.woorderId);
            const address = await this.addressService.getOneAddres(
                orderLocal.addressId,
            );

            const addressFaal: Address = {
                id: orderLocal.addressId,
                address1: 'Av.9 de julio 159',
                city: 'Tartagal',
                cpcode: 4560,
                country: 'Argentina',
                ownerId: '1221',
                createAt: new Date(),
                updateAt: new Date(),
            };

            const CompleteOrder = {
                id: orderLocal.id,
                worderId: orderLocal.woorderId,
                products: orderAPI.line_items,
                billing: user,
                deliveryAddress:
                    orderLocal.addressId == '2' ? addressFaal : address,
                deliveryType: orderAPI.shipping_lines[0].method_title,
                methodPay: orderAPI.payment_method_title,
                status: orderAPI.status,
                amount: orderLocal.amount,
            };

            return CompleteOrder;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteOrderLocal(orId: string, userId: string) {
        try {
            const orderLocal = await this.getOrderLocal(orId, userId);
            await this.orderRepo.delete(orderLocal.id);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getAllMyOrders(userId: string) {
        try {
            const userISAdmin = await this.userService.findOne(userId);
            console.log(userISAdmin)
    
            if(userISAdmin.role == 'admin'){
                const myors = await this.orderRepo.find();
    
                return await this.getCompleteOrderList(myors.slice(0,9), userId);
            }
            const myors = await this.orderRepo.find({ where:  { ownerId: userId }});
    
            return await this.getCompleteOrderList(myors, userId);
        } catch (error) {
            throw new HttpException('hubo un error', 302);
        }
       
    }

    async getCompleteOrderList(orders: Orders[], userId: string): Promise<any> {
        return new Promise((res, rej) => {
            let mylist = [];
        console.log(`hOla ${orders.length}`);
        if(orders.length != 0) {
                do {
                    orders.forEach( async (e) => {
                        const getor = await this.getCompleteOrder(e.id, userId);
                        mylist = [...mylist, getor];
                        if(mylist.length == orders.length) {
                            res(mylist);
                        }
                    })
                    
                } while (mylist.length == orders.length);
        } else {
            res([])
        }

        });
    }
    
}
