import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from 'src/albums/album.module';
import { ArtistModule } from 'src/artists/artist.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [forwardRef(() => ArtistModule), forwardRef(() => AlbumModule)],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
