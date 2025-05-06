import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ClipsService } from './clips.service';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import { Clip } from '@video-player/shared/interfaces';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Post()
  create(@Body() createClipDto: CreateClipDto) {
    return this.clipsService.create(createClipDto);
  }

  @Get()
  async findAll(    
    @Query('clipId') clipId?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortDirection') sortDirection: 'asc' | 'desc' = 'asc',
  ) {
    if (clipId) {
      return this.clipsService.findOne(clipId);
    }

    const allowedSortBy: (keyof Clip)[] = ['id'];
    const safeSortBy: keyof Clip = allowedSortBy.includes(sortBy as keyof Clip) ? sortBy as keyof Clip : 'id';
  
    return this.clipsService.findAll(page, limit, safeSortBy, sortDirection);  
  }
  
  // @Get()
  // async findOne(@Query('clipId') id: number) {
  //   return this.clipsService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClipDto: UpdateClipDto) {
    return this.clipsService.update(+id, updateClipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clipsService.remove(+id);
  }
}
