import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

const configPath = path.join(process.cwd(), 'config', 'gateway.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as any;
const JWT_SECRET = config.jwt.secret;

@Module({
    imports: [
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthService, AuthGuard, JwtModule],
})
export class AuthsModule { } 
