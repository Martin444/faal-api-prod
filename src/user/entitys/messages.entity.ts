import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Messages {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    authorId: string;

    @Column({ type: 'varchar' })
    receiveId: string;

    @Column({ type: 'varchar', length: 255 })
    message: string;

    @Column({ type: 'varchar', length: 255 })
    chatID: string;

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
