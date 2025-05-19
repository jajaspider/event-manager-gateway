import { Module } from '@nestjs/common';

import { RewardHistoryService } from './reward-history.service';
import { RewardHistoryController } from './reward-history.controller';

@Module({
    controllers: [RewardHistoryController],
    providers: [RewardHistoryService],
    exports: [RewardHistoryService],
})
export class RewardHistoryModule { } 
