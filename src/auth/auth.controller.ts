import { Controller, Get, Post, Version, Body, Param, Put, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @Version('0')
    async login(@Body() user: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.login(user);
        res.setHeader('Authorization', `Bearer ${token}`);
        return { message: 'Login successful' };
    }

}
