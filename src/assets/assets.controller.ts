import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
// import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.create(createAssetDto);
  }

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  @Get(':symbol')
  findOne(@Param('symbol') symbol: string) {
    return this.assetsService.findOne(symbol); // Removido o + antes do symbol
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
  //   return this.assetsService.update(+id, updateAssetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.assetsService.remove(+id);
  // }
}
