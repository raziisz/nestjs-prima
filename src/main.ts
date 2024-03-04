import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './infra/http/exceptions/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false,
    exceptionFactory: (errors: any) => {
      const exceptions = errors.map((error) => {
        return Object.values(error.constraints).join('');
      });
      return new ValidationException(exceptions);
    },
  }));

  await app.listen(3000);
}
bootstrap();
