import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from '../cloudinary/provider/cloudinary';
import { CloudinaryController } from './cloudinary.controller';

@Module({
    imports: [CloudinaryModule],
    controllers: [CloudinaryController],
    providers: [CloudinaryService, CloudinaryProvider],
    exports: [CloudinaryService],
})
export class CloudinaryModule {}
