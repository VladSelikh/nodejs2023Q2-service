import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumModule } from '../albums/album.module';
import { TrackModule } from '../tracks/track.module';

@Module({
  imports: [forwardRef(() => AlbumModule), forwardRef(() => TrackModule)],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
