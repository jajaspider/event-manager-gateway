import { HttpException, Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import axios, { AxiosError } from 'axios';
import * as fs from 'fs';
import * as _ from 'lodash';

import { CreateUserDto } from './dto/create-user.dto';

const config = yaml.load(fs.readFileSync('config/gateway.yaml', 'utf8')) as any;

@Injectable()
export class UserService {
    // Define as class properties instead of constructor parameters
    private auth = config.event_manager.auth;
    private api = config.event_manager.api;

    async createUser(user: CreateUserDto) {

        try {
            if (!user) {
                throw new HttpException('Invalid user data: user object is required', 400);
            }
            if (!user.user_id) {
                throw new HttpException('Invalid user data: user_id is required', 400);
            }
            if (!user.nickname) {
                throw new HttpException('Invalid user data: nickname is required', 400);
            }
            if (!user.password) {
                throw new HttpException('Invalid user data: password is required', 400);
            }
            if (!user.role) {
                throw new HttpException('Invalid user data: role is required', 400);
            }

            // Validate role enum
            const validRoles = ['user', 'operator', 'auditor', 'admin'];
            if (!validRoles.includes(user.role)) {
                throw new HttpException(`Invalid role. Must be one of: ${validRoles.join(', ')}`, 400);
            }

            const authUserUrl = `http://${this.auth}/v0/users`;
            const authUser = await axios.post(authUserUrl, user);
            const createdUser = authUser.data;

            const apiUserUrl = `http://${this.api}/v0/users`;
            const apiUser = await axios.post(apiUserUrl, {
                user_id: createdUser._id,
                invited_count: user.invited_count || 0,
                monster_count: user.monster_count || 0,
                inventory: user.inventory || []
            });
            const createdApiUser = apiUser.data;

            return {
                user_id: createdUser.user_id,
                nickname: createdUser.nickname,
                role: createdUser.role,
                invited_count: createdApiUser.invited_count,
                monster_count: createdApiUser.monster_count,
                inventory: createdApiUser.inventory
            };
        } catch (error) {
            if (error instanceof AxiosError) {
                const httpStatus = error.response.status;
                const errorMessage = error.response.data.message;
                throw new HttpException(errorMessage, httpStatus);
            }
            throw error;
        }
    }

    async findAllUsers() {
        let users = [];

        const authUserUrl = `http://${this.auth}/v0/users`;
        const apiUserUrl = `http://${this.api}/v0/users`;

        try {
            const authUser = await axios.get(authUserUrl);

            users = _.filter(authUser.data, (_user) => _user.role === 'user');
        } catch (error) {
            console.dir(error)
            throw new HttpException('Failed to fetch users from auth service', 500);
        }

        try {
            for (const _user of users) {
                const inventory = await axios.get(`${apiUserUrl}/${_user._id}/inventory`);
                _user.inventory = inventory.data;
            }
        } catch (error) {
            console.dir(error)
            throw new HttpException('Failed to fetch users from api service', 500);
        }

        return users;
    }
}
