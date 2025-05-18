import { Controller, Get, Post, Version, Body, Param, Put } from '@nestjs/common';

import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateRewardDto } from './dto/create-reward.dto';

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

    @Post('')
    @Version('0')
    async createEvent(@Body() event: CreateEventDto) {
        return await this.eventService.createEvent(event);
    }

    @Post(':id/rewards')
    @Version('0')
    async requestEventReward(@Param('id') id: string, @Body() rewardRequest: CreateRewardDto) {
        return await this.eventService.requestEventReward(id, rewardRequest);
    }

    @Put(':id/deactivate')
    @Version('0')
    async deactivateEvent(@Param('id') id: string) {
        return await this.eventService.deactivateEvent(id);
    }

}
