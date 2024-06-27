import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { PrismaService } from './prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), TelegramBotModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, TelegramBotService, PrismaService],
})
export class AppModule {}
