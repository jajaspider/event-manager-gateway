import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('')
    @Version('0')
    async listUsers() {
        return await this.userService.findAllUsers();
    }

    @Post('')
    @Version('0')
    async createUser(@Body() user: any) {
        return await this.userService.createUser(user);
    }

}