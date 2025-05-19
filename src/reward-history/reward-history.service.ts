import { HttpException, Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import axios, { AxiosError } from 'axios';
import * as fs from 'fs';

const config = yaml.load(fs.readFileSync('config/gateway.yaml', 'utf8')) as any;

@Injectable()
export class RewardHistoryService {

    async getRewardHistory() {
        try {
            const apiUrl = `http://${config.event_manager.api}/v0/reward-history`;
            const response = await axios.get(apiUrl)
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
}