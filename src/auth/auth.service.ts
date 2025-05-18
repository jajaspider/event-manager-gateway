import { HttpException, Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import axios, { AxiosError } from 'axios';
import * as fs from 'fs';
import * as _ from 'lodash';

import { LoginUserDto } from './dto/login-user.dto';


const config = yaml.load(fs.readFileSync('config/gateway.yaml', 'utf8')) as any;

@Injectable()
export class AuthService {

    async login(user: LoginUserDto) {
        try {
            const authUrl = `http://${config.event_manager.auth}/v0/auth/login`;
            const response = await axios.post(authUrl, user)
            // console.dir(response.data.access_token);
            return response.data.access_token;
        } catch (error) {
            if (error instanceof AxiosError) {
                const httpStatus = error.response.status;
                const errorMessage = error.response.data.message;
                throw new HttpException(errorMessage, httpStatus);
            }
            throw error;
        }
    }
}