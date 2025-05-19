import { Controller, Get, Version, UseGuards } from '@nestjs/common';

import { RewardHistoryService } from "./reward-history.service";
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/role/roles.decorator';

@Controller('reward-history')
export class RewardHistoryController {
    constructor(private readonly rewardHistoryService: RewardHistoryService) { }

    @Get('')
    @UseGuards(AuthGuard)
    @Roles('admin', 'operator', 'auditor')
    @Version('0')
    async getRewardHistory() {
        return await this.rewardHistoryService.getRewardHistory();
    }
}
