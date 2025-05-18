import { Controller, Get, Post, Version, Body, Param, Put, UseGuards, Req } from '@nestjs/common';

import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from '../interfaces/request.interface';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Get('')
    @Version('0')
    async listEvents() {
        return await this.eventService.findAllEvents();
    }

    @Get(':id')
    @Version('0')
    async getEventById(@Param('id') id: string) {
        return await this.eventService.findEventById(id);
    }

    // 운영자 또는 관리자가 이벤트를 생성할 수 있어야 합니다.
    @Post('')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'operator')
    @Version('0')
    async createEvent(@Body() event: CreateEventDto) {
        return await this.eventService.createEvent(event);
    }

    // 유저는 특정 이벤트에 대해 보상을 요청할 수 있어야 합니다.
    @Post(':id/rewards')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('user')
    @Version('0')
    async requestEventReward(@Param('id') id: string, @Body() rewardRequest: CreateRewardDto, @Req() req: Request) {
        return await this.eventService.requestEventReward(req, id, rewardRequest);
    }

    @Put(':id/deactivate')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'operator')
    @Version('0')
    async deactivateEvent(@Param('id') id: string) {
        return await this.eventService.deactivateEvent(id);
    }
}
