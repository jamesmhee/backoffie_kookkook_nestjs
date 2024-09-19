import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
    .setTitle('Mobile Backoffice')    
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addTag('user')
    .build();