import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly jwtSecret: string;

    constructor(private jwtService: JwtService) {
        const configPath = path.join(process.cwd(), 'config', 'gateway.yaml');
        const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as { jwt: { secret: string } };
        this.jwtSecret = config.jwt.secret;
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payload = this.jwtService.verify(token, { secret: this.jwtSecret });
            request['user'] = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
