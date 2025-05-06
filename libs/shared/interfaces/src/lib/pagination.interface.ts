import { Clip } from "./clip.interface";

export interface PaginatedResponse<Clip> {
    items: Clip[];
    totalItems: number;
    totalPages: number;
    page: number;
    limit: number;
}