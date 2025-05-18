export enum EventType {
    ATTENDANCE = 'attendance',
    INVITE = 'invite',
    MONSTER = 'monster',
    COUPON = 'coupon',
    LOTTERY = 'lottery',
}
export class CreateRewardDto {
    day?: number;
    invite?: number;
    monster?: number;
    coupon?: string;
    reward_item_no?: string;
    reward_count?: number;
}

export class CreateEventDto {
    name: string;
    description: string;
    type: EventType;
    start_date: Date;
    end_date: Date;
    options: {
        invite_limit?: number;
        attendance_limit?: number;
    };
    rewards?: CreateRewardDto[];
} 