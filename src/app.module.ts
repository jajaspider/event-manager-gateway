import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { AuthsModule } from './auth/auths.module';
import { JwtModule } from '@nestjs/jwt';
import { RewardHistoryModule } from './reward-history/reward-history.module';

@Module({
  imports: [UsersModule, EventsModule, AuthsModule, RewardHistoryModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
