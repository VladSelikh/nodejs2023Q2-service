import { forwardRef, Module } from '@nestjs/common';
import { ArtistModule } from '../artists/artist.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from '../tracks/track.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
