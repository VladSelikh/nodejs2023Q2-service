import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuid4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  public findAll(): Artist[] {
    return this.artists;
  }

  public findById(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  public create(artistDto: CreateArtistDto): Artist {
    const { name, grammy } = artistDto;

    const newArtist = {
      id: uuid4(),
      name,
      grammy,
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  public updateById(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findById(id);

    const updatedArtist = {
      ...artist,
      grammy: updateArtistDto.grammy,
    };

    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists[index] = updatedArtist;

    return updatedArtist;
  }

  public deleteById(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
  }
}
