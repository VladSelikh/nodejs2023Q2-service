import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../albums/album.module';
import { ArtistModule } from '../artists/artist.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
