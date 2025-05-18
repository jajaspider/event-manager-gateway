import { Body, Controller, Get, Param, Post, Query, Version } from '@nestjs/common';

import { UserService } from './user.service';
import { EventService } from 'src/events/event.service';
import { QueryRewardClaimDto } from '../reward-claims/dto/reward-query.dto'

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly eventService: EventService) { }

    @Get('')
    @Version('0')
    async listUsers() {
        return await this.userService.findAllUsers();
    }

    @Get('reward-claims')
    @Version('0')
    async listRewardClaims(@Query() query: QueryRewardClaimDto) {
        return await this.eventService.getRewardClaims(query);
    }

    @Post('')
    @Version('0')
    async createUser(@Body() user: any) {
        return await this.userService.createUser(user);
    }

    // 자신의 보상 요청 기록 확인하기
    @Get(':id/reward-claims')
    @Version('0')
    async getRewardClaims(@Param('id') id: string) {
        return await this.eventService.getRewardClaimsByUserId(id);
    }
}