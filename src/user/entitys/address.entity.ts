import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Address {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    country: string;

    @Column({ type: 'varchar', length: 255 })
    city: string;

    @Column({ type: 'int' })
    cpcode: number;

    @Column({ type: 'varchar', length: 255 })
    address1: string;

    // @Column({ type: 'double precision', name: 'd_lat' })
    // lat: number;

    // @Column({ type: 'double precision', name: 'd_long' })
    // long: number;

    @Column({ type: 'varchar', length: 100 })
    ownerId: string;

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
