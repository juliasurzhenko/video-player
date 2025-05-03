import { Injectable } from '@nestjs/common';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import axios from 'axios';

@Injectable()
export class ClipsService {
  create(createClipDto: CreateClipDto) {
    return 'This action adds a new clip';
  }

  async findAll(
    page: number = 1, 
    limit: number = 10, 
    sortBy: string = 'date', 
    sortDirection: 'asc' | 'desc' = 'desc'
  ) {
    try {
      const response = await axios.get(process.env.API_URL, {
        params: {
          page,
          limit,
          sortBy,
          sortDirection,
        },
      });
      return response.data; // повертаємо отримані дані
    } catch (error) {
      throw new Error('Error fetching clips');
    }
  }

  async findOne(id: number) {
    try {
      const response = await axios.get(`${process.env.API_URL}`, {
        params: { id },
      });
      return response.data; // повертаємо відео за id
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
