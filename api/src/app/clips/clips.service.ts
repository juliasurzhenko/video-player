import { Injectable } from '@nestjs/common';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import axios from 'axios';
import { paginate } from '@video-player/shared/utils';
import { Clip, PaginatedResponse } from '@video-player/shared/interfaces';
const MAX_LIMIT = 10;

@Injectable()
export class ClipsService {
  create(createClipDto: CreateClipDto) {
    return 'This action adds a new clip';
  }

  async findAll(
    page: number = 1, 
    limit: number = 10, 
    sortBy: keyof Clip = 'id',
    sortDirection: 'asc' | 'desc' = 'desc'
  ): Promise<PaginatedResponse<Clip>> {
    try {
      const safeLimit = Math.min(limit, MAX_LIMIT);

      const response = await axios.get<PaginatedResponse<Clip>>(process.env.API_URL);
  
      const sortedItems = response.data.items.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  
      const totalItems = sortedItems.length;
      const totalPages = Math.ceil(totalItems / safeLimit);
      const offset = (page - 1) * safeLimit;
      const paginatedItems = sortedItems.slice(offset, offset + safeLimit);
  
      return {
        items: paginatedItems,
        totalItems,
        totalPages,
        page,
        limit: safeLimit,
      };
    } catch (error) {
      console.error('Error in findAll:', error);

      throw new Error('Error fetching clips');
    }
  }

  async findOne(id: number): Promise<Clip> {
    try {
      const response = await axios.get<Clip>(`${process.env.API_URL}`, {
        params: { id },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching video with id ${id}`);
    }
  }

  update(id: number, updateClipDto: UpdateClipDto) {
    return `This action updates a #${id} clip`;
  }

  remove(id: number) {
    return `This action removes a #${id} clip`;
  }
}
