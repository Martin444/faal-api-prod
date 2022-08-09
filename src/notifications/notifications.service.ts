import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../../clave.serviceg.json';
import { CreateNotifyDto } from './dtos/create-notify.dto';
import { Notification } from './entities/notification.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepo: Repository<Notification>,
    ) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as ServiceAccount),
        });
    }
    async create(pushInfo: CreateNotifyDto): Promise<any> {
        try {
            const payload = {
                notification: {
                    title: pushInfo.title,
                    body: pushInfo.body,
                },
            };
            const notify = await admin.messaging().sendToTopic('news', payload);
            const newNotify = this.notificationRepo.create(pushInfo);
            newNotify.id = uuidv4();
            newNotify.messageId = notify.messageId.toString();
            return this.notificationRepo.save(newNotify);
        } catch (error) {
            console.log(error);
            throw new HttpException(error, 500);
        }
    }
}
