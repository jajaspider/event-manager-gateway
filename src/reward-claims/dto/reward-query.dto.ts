export class QueryRewardClaimDto {
    readonly user_id?: string;
    readonly event_id?: string;
    readonly status?: 'pending' | 'completed' | 'rejected';
} 