import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitys/user.entity';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { Address } from './entitys/address.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User, Address])],
    controllers: [UserController, AddressController],
    providers: [UserService, AddressService],
    exports: [UserService, AddressService],
})
export class UserModule {}
