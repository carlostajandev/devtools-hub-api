// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./shared/filters/all-exceptions.filter";
import { ResponseInterceptor } from "./shared/interceptors/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api"); // prefijo general opcional
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
  console.log(`🚀 Servidor corriendo en http://localhost:3000/api`);
}
bootstrap();
