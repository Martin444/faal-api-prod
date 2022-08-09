import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Products {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    price: string;

    @Column({ type: 'varchar', length: 255 })
    categorys: string[];

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
