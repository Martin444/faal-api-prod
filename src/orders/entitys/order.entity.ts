import { IsOptional } from 'class-validator';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Orders {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    ownerId: string;

    @Column({ type: 'varchar', length: 255 })
    addressId: string;

    @Column({ type: 'varchar', length: 255 })
    woorderId: string;

    @IsOptional()
    @Column({ type: 'varchar', length: 255 })
    amount: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;

    // @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
    // @JoinColumn()
    // customer: Customer;
}
