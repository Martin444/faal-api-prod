import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';
@Entity()
export class Notification {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    body: string;

    @Column({ type: 'text' })
    messageId: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
