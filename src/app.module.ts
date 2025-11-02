/* eslint-disable prettier/prettier */
// src/app.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./config/database.config";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/user/user.module";
import { PlansModule } from "./modules/plans/plans.module";
import { SubscriptionsModule } from "./modules/subscriptions/subscription.module";
import { PaymentsModule } from "./modules/Payments/payment.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    //RouterModule.forRoutes(routes),
    TypeOrmModule.forRootAsync({ useFactory: databaseConfig }),
    AuthModule, UsersModule, PlansModule, SubscriptionsModule, PaymentsModule, NotificationsModule
  ],
})
export class AppModule {}
