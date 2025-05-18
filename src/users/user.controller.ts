import { Body, Controller, Get, Param, Post, Query, UseGuards, Version } from '@nestjs/common';

import { UserService } from './user.service';
import { EventService } from 'src/events/event.service';
import { QueryRewardClaimDto } from '../reward-claims/dto/reward-query.dto'
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';

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

    // 운영자 / 감사자 / 관리자는 전체 유저의 요청 기록을 조회할 수 있어야 합니다
    @Get('reward-claims')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'operator', 'auditor')
    @Version('0')
    async listRewardClaims(@Query() query: QueryRewardClaimDto) {
        return await this.eventService.getRewardClaims(query);
    }

    @Post('')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @Version('0')
    async createUser(@Body() user: any) {
        return await this.userService.createUser(user);
    }

    // 유저는 본인의 요청 이력을 볼 수 있어야 합니다.
    @Get(':id/reward-claims')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('user')
    @Version('0')
    async getRewardClaims(@Param('id') id: string) {
        return await this.eventService.getRewardClaimsByUserId(id);
    }
}