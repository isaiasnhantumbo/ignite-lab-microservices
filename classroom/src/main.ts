import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  });
  app.startAllMicroservices().then(() => {
    console.log('[MICROSERVICES] Microservices running to paradise');
  });
  app.listen(3334).then(() => {
    console.log('[HTTP SERVER] HTTP SERVER running to paradise');
  });
}
bootstrap();
