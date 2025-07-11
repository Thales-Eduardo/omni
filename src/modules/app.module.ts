import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          // 100 req por minuto
          ttl: Number(process.env.RATE_LIMIT_TTL), // 1 minuto (em segundos)
          limit: Number(process.env.RATE_LIMIT_LIMIT), //máx de req
        },
      ],
      // storage: new ThrottlerStorageRedisService({
      //   host: 'localhost',
      //   port: 6379,
      // }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, //rate limit globalmente
    },
  ],
})
export class AppModule {}
