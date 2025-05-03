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

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Post()
  create(@Body() createClipDto: CreateClipDto) {
    return this.clipsService.create(createClipDto);
  }

  @Get()
  async findAll(    
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'date',
    @Query('sortDirection') sortDirection: 'asc' | 'desc' = 'desc',
  ) {
  return this.clipsService.findAll(page, limit, sortBy, sortDirection);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.clipsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClipDto: UpdateClipDto) {
    return this.clipsService.update(+id, updateClipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clipsService.remove(+id);
  }
}
