import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';
import { GigaChat } from 'gigachat-node';
import TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramBotService {
  BOT_NAME: string = '@my_gigachat_123_bot';
  client: any;
  constructor(private readonly httpService: HttpService) {}
  async onModuleInit() {
    this.botMessage();
  }
  botMessage() {
    const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
    bot.on('new_chat_members', (msg) => {
      bot.sendMessage(msg.chat.id, `Здороу`);
    });

    bot.on('message', async (msg) => {
      console.log(msg);
      if (!!msg?.entities || msg.chat.type === 'group') {
        const regexp = new RegExp(this.BOT_NAME, 'g');
        const isMentionBot = !!msg.text.match(regexp);
        if (!isMentionBot) return;
      }
      if (!this.client) {
        await this.createToken();
      }
      const message = await this.getMessage(msg.text);
      console.log(message);

      bot.sendMessage(msg.chat.id, message.content);
    });
  }
  async createToken() {
    const client = new GigaChat(process.env.CLIENT_SECRET);
    await client.createToken();
    this.client = client;
    // const response = await firstValueFrom(this.httpService.post(config));

    // console.log(response);
  }
  async getMessage(text: string) {
    const responce = await this.client.completion({
      model: 'GigaChat:latest',
      messages: [
        {
          role: 'user',
          content: text,
        },
      ],
    });
    return responce.choices[0].message;
  }
}
