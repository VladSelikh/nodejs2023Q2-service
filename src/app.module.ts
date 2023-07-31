import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ArtistModule } from './artists/artist.module';
import { AlbumModule } from './albums/album.module';
import { TrackModule } from './tracks/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DBModule } from './db/db.module';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
    DBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
