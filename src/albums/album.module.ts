import { Module } from '@nestjs/common';
import { ArtistModule } from 'src/artists/artist.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [ArtistModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
