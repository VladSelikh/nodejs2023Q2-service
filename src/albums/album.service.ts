import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { v4 as uuid4 } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  constructor(private dbService: DBService) {}

  public async findAll(): Promise<Album[]> {
    return this.dbService.getAllAlbums();
  }

  public async findById(id: string): Promise<Album> {
    return this.dbService.getAlbumById(id);
  }

  public async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { name, year, artistId } = createAlbumDto;

    const newAlbum: Album = {
      id: uuid4(),
      name,
      year,
      artistId,
    };

    await this.dbService.createAlbum(newAlbum);
    return newAlbum;
  }

  public async updateById(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.dbService.getAlbumById(id);

    const updatedAlbum: Album = {
      ...album,
      name: updateAlbumDto.name ? updateAlbumDto.name : album.name,
      year: updateAlbumDto.year ? updateAlbumDto.year : album.year,
      artistId:
        updateAlbumDto.artistId || updateAlbumDto.artistId === null
          ? updateAlbumDto.artistId
          : album.artistId,
    };

    await this.dbService.updateAlbumById(id, updatedAlbum);

    return updatedAlbum;
  }

  public async deleteById(id: string) {
    await this.dbService.deleteAlbumById(id);

    const tracks = await this.dbService.getAllTracks();
    for (const track of tracks) {
      if (track.albumId === id) {
        await this.dbService.updateTrackById(track.id, {
          ...track,
          albumId: null,
        });
      }
    }

    const favorites = await this.dbService.getFavoriteAlbums();
    const isFav = favorites.includes(id);
    if (isFav) {
      await this.dbService.removeAlbumFromFavoritesById(id);
    }
  }
}
