import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
  }

  async onModuleInit() {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log('Redis connected');
    }
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}