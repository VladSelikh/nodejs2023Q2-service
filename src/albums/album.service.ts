import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  public findAll(): Album[] {
    return this.albums;
  }

  public findById(id: string): Album {
    return this.albums.find((album) => album.id === id);
  }

  public create(createAlbumDto: CreateAlbumDto): Album {
    const { name, year, artistId } = createAlbumDto;

    const newAlbum: Album = {
      id: uuid4(),
      name,
      year,
      artistId,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  public updateById(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.findById(id);

    const updatedAlbum: Album = {
      ...album,
      name: updateAlbumDto.name ? updateAlbumDto.name : album.name,
      year: updateAlbumDto.year ? updateAlbumDto.year : album.year,
      artistId:
        updateAlbumDto.artistId || updateAlbumDto.artistId === null
          ? updateAlbumDto.artistId
          : album.artistId,
    };

    const index = this.albums.findIndex((album) => album.id === id);
    this.albums[index] = updatedAlbum;

    return updatedAlbum;
  }

  public deleteById(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
  }
}
