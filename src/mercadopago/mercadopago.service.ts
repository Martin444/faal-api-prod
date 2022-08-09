import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as MercadoPago from 'mercadopago';
import { CreateOrder } from 'src/orders/dto/order.dto';

@Injectable()
export class MercadopagoService {
    constructor() {
        try {
            MercadoPago.configure({
                access_token: process.env.MP_ACCESS_TOKEN,
                sandbox: true, // TODO
            });
        } catch (error) {
            console.log(error);
            // Log error into DB - not await
            throw new InternalServerErrorException(
                'Error al inicializar MercadoPagoService',
            );
        }
    }

    async createPreference(or: CreateOrder, user: any) {
        try {
            let items = [];

            or.products.forEach((element) => {
                const mpC = parseFloat(element.price) * 0.0992;
                items = [
                    ...items,
                    {
                        title: element.name,
                        quantity: element.quantity,
                        currency_id: 'ARS',
                        unit_price: parseFloat(element.price) + mpC,
                    },
                ];
            });

            const preference = {
                items: items,
                payer: {
                    name: user.name,
                    surname: '',
                    email: user.email,
                },
                payment_methods: {
                    excluded_payment_methods: [
                        { transaction_types: ['ticket', 'bank_transfer'] },
                    ],
                },
            };
            const payment = await MercadoPago.preferences.create(preference);
            return {
                id: `${payment.body.id}`,
            };
        } catch (e) {
            console.log(`Tiene un error ${e}`);
            throw new InternalServerErrorException(e);
        }
    }
}
