/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
// main.ts - POLYFILL MÁS ROBUSTO
import { webcrypto } from 'crypto';

// Verifica y completa el objeto crypto global de manera segura
const globalCrypto = (global as any).crypto;
if (!globalCrypto) {
  (global as any).crypto = webcrypto;
} else {
  // Completa métodos faltantes sin sobreescribir todo el objeto
  if (!globalCrypto.randomUUID) {
    globalCrypto.randomUUID = webcrypto.randomUUID;
  }
  if (!globalCrypto.getRandomValues) {
    globalCrypto.getRandomValues = webcrypto.getRandomValues;
  }
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global (todas las rutas comienzan con /api)
  app.setGlobalPrefix('api');

  // Pipes globales para validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filtro global de excepciones
  app.useGlobalFilters(new AllExceptionsFilter());

  // Interceptor global de respuestas
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 🔒 Seguridad básica (helmet)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(helmet());

  // 🌐 Habilitar CORS sin restricciones (para pruebas o frontend local)
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 📘 Configuración de Swagger (documentación automática)
  const config = new DocumentBuilder()
    .setTitle('DevToolsHub API')
    .setDescription(
      'API modular de DevToolsHub, implementada con NestJS y arquitectura hexagonal.<br><br>Incluye módulos de autenticación, usuarios, planes, suscripciones, pagos y notificaciones.',
    )
    .addTag('Auth', 'Autenticación y registro de usuarios')
    .addTag('User', 'Gestión de usuarios registrados')
    .addTag('Plan', 'Planes de suscripción disponibles')
    .addTag('Subscription', 'Suscripciones activas de los usuarios')
    .addTag('Payment', 'Procesamiento de pagos y facturación')
    .addTag('Notification', 'Notificaciones y envío de correos electrónicos')
    .addBearerAuth() // si manejas JWT más adelante
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'DevToolsHub API Docs',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
  console.log(`🚀 Servidor corriendo en: http://localhost:3000/api`);
  console.log(`📘 Documentación disponible en: http://localhost:3000/api/docs`);
}

bootstrap();
