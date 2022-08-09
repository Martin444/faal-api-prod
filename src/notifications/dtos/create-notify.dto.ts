import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotifyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The notification title',
        example: 'Promoción de fin de semana',
    })
    readonly title: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The notification message',
        example: '¡Felicidades! Te has ganado una promoción de fin de semana',
    })
    readonly body: string;
}
