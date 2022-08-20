import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateAddress } from '../dto/address.dto';
import { Address } from '../entitys/address.entity';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address) private addressRepo: Repository<Address>,
    ) {}

    async getAddress(userId: string): Promise<Address[]> {
        const address = await this.addressRepo.find({
            where: { ownerId: userId },
        });
        return [...address];
    }

    async createAddresUser(
        data: CreateAddress,
        userId: string,
    ): Promise<Address> {
        const newAddress = this.addressRepo.create(data);
        newAddress.id = uuidv4();
        newAddress.ownerId = userId;
        return this.addressRepo.save(newAddress);
    }

    async getOneAddres(id: string): Promise<Address> {
        const address = await this.addressRepo.findOne({ where: { id } });
        return address;
    }

    async deleteAlladdress() {
        return await this.addressRepo.clear();
    }
}
