import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { environment } from './enviroment';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      // validationSchema: Joi.object({}),
  }),
  AuthModule,
  UserModule,
  DatabaseModule,
  ProductsModule,
  CategoriesModule,
  MercadopagoModule,
  NotificationsModule,
  CloudinaryModule,
  OrdersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
