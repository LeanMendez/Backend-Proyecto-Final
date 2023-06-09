import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/configVariables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.get<number>(PORT) || 3000;
  console.log(port);
  await app.listen(port);
}
bootstrap();
