import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateAssetDto } from 'src/assets/dto/create-asset.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.walletsService.create(createAssetDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(id);
  }
  @Post(':id/assets')
  createWalletAsset(@Param('id') id: string, @Body() body: {assetId: string, shares: number}) {
    return this.walletsService.createWalletAsset({
      wallet: id,
      asset: body.assetId,
      shares: body.shares
    });
  }
}