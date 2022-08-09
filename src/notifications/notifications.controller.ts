import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateNotifyDto } from './dtos/create-notify.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Post()
    async create(@Body() createNotifyDto: CreateNotifyDto) {
        return this.notificationsService.create(createNotifyDto);
    }
}
