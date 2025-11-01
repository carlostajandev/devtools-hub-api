/* eslint-disable prettier/prettier */
// src/app.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./config/database.config";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/user/user.module";
import { PlansModule } from "./modules/plans/plans.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    //RouterModule.forRoutes(routes),
    TypeOrmModule.forRootAsync({ useFactory: databaseConfig }),
    AuthModule, UsersModule, PlansModule
  ],
})
export class AppModule {}
