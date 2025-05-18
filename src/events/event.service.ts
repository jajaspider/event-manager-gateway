import { HttpException, Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import axios, { AxiosError } from 'axios';
import * as fs from 'fs';
import * as _ from 'lodash';

import { CreateRewardDto } from './dto/create-reward.dto';
import { QueryRewardClaimDto } from '../reward-claims/dto/reward-query.dto';

const config = yaml.load(fs.readFileSync('config/gateway.yaml', 'utf8')) as any;

@Injectable()
export class EventService {

    async findAllEvents() {
        try {
            const eventUrl = `http://${config.event_manager.api}/v0/events`;
            const events = await axios.get(eventUrl);
            return events.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const httpStatus = error.response.status;
                const errorMessage = error.response.data.message;
                throw new HttpException(errorMessage, httpStatus);
            }
            throw error;
        }
    }


    async findEventById(id: string) {
        try {
            const eventUrl = `http://${config.event_manager.api}/v0/events/${id}`;
            const event = await axios.get(eventUrl);
            return event.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const httpStatus = error.response.status;
                const errorMessage = error.response.data.message;
                throw new HttpException(errorMessage, httpStatus);
            }
            throw error;
        }
    }

    async createEvent(event: any) {
        try {
            const eventUrl = `http://${config.event_manager.api}/v0/events`;
            const events = await axios.post(eventUrl, event);
            return events.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const httpStatus = error.response.status;
                const errorMessage = error.response.data.message;
                throw new HttpException(errorMessage, httpStatus);
            }
            throw error;
        }

    }

    async requestEventReward(id: string, rewardRequest: CreateRewardDto) {
        try {
            const eventUrl = `http://${config.event_manager.api}/v0/reward-claims/`;
            const response = await axios.post(eventUrl, {
                user_id: "123",
                event_id: id,
                reward_id: rewardRequest.reward_id
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const httpStatus = error.response.status;
                const errorMessage = error.response.data.message;
                throw new HttpException(errorMessage, httpStatus);
            }
            throw error;
        }
    }

    async getRewardClaimsByUserId(userId: string) {
        try {
            const eventUrl = `http://${config.event_manager.api}/v0/reward-claims/user/${userId}`;
            const response = await axios.get(eventUrl);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const httpStatus = error.response.status;
                const errorMessage = error.response.data.message;
                throw new HttpException(errorMessage, httpStatus);
            }
            throw error;
        }
    }

    async getRewardClaims(query: QueryRewardClaimDto) {
        try {
            const eventUrl = `http://${config.event_manager.api}/v0/reward-claims/`;
            const response = await axios.get(eventUrl, { params: query });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const httpStatus = error.response.status;
                const errorMessage = error.response.data.message;
                throw new HttpException(errorMessage, httpStatus);
            }
        }
    }

    async deactivateEvent(id: string) {
        try {
            const eventUrl = `http://${config.event_manager.api}/v0/events/${id}/deactivate`;
            const response = await axios.post(eventUrl);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const httpStatus = error.response.status;
                const errorMessage = error.response.data.message;
                throw new HttpException(errorMessage, httpStatus);
            }
        }
    }
}
