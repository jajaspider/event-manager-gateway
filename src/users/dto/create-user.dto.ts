import { InventoryItemDto } from './inventory-item.dto';

export class CreateUserDto {
    user_id: string;
    nickname: string;
    password: string;
    role: string;
    invited_count?: number;
    monster_count?: number;
    inventory?: InventoryItemDto[];
}