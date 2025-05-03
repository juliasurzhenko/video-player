import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClipsModule } from './clips/clips.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClipsModule,
    ConfigModule.forRoot({
      isGlobal: true, // дозволяє доступ до env змінних без імпорту в кожному модулі
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
