import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EventService } from 'src/events/event.service';

@Module({
    controllers: [UserController],
    providers: [UserService, EventService],
    exports: [UserService],
})
export class UsersModule { } 
