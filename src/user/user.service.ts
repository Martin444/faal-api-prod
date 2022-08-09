import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './entitys/user.entity';

import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    async create(data: CreateUserDto) {
        const newUser = this.userRepo.create(data);
        const passhash = await bcrypt.hash(newUser.password, 10);
        newUser.password = passhash;
        newUser.id = uuidv4();
        return this.userRepo.save(newUser);
    }

    async createOfSocial(data: CreateUserDto) {
        const newUser = this.userRepo.create(data);
        console.log(newUser);
        // if (data.customerId) {
        //     const customer = await this.customerService.findOne(
        //         data.customerId,
        //     );
        //     newUser.customer = customer;
        // }

        return this.userRepo.save(newUser);
    }

    async findOne(id: string) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
    }

    async findByEmail(email: string) {
        return await this.userRepo.findOne({ where: { email: email } });
    }

    async update(id: string, changes: UpdateUserDto) {
        const user = await this.userRepo.findOne({ where: { id }});
        this.userRepo.merge(user, changes);
        return this.userRepo.save(user);
    }

    remove(id: number) {
        return this.userRepo.delete(id);
    }
}
