import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log(process.env)
  const port = process.env.PORT || 8080;
  await app.listen(port);
}
bootstrap();
