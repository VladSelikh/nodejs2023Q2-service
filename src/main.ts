import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const file = await readFile(join(cwd(), 'doc', 'api.yaml'), 'utf8');
  const document = parse(file);

  SwaggerModule.setup('doc', app, document);

  dotenv.config();
  await app.listen(+process.env.PORT || 4000);
}
bootstrap();
