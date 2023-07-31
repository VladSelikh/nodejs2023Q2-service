import { Module, forwardRef } from '@nestjs/common';
import { AlbumModule } from '../albums/album.module';
import { ArtistModule } from '../artists/artist.module';
import { TrackModule } from '../tracks/track.module';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
