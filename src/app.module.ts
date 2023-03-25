import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MailerModule } from './mailer/mailer.module';
import { DB_PROD_URI, DB_URI, NODE_ENV } from './config/configVariables';
import { CartModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { BcryptModule } from './bcrypt/bcrypt.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: NODE_ENV
          ? configService.get<string>(DB_PROD_URI)
          : configService.get<string>(DB_URI),
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    MailerModule,
    CartModule,
    OrdersModule,
    BcryptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
