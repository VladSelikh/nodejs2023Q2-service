import { Injectable } from '@nestjs/common';
import { Track } from '../tracks/interfaces/track.interface';
import { v4 as uuid4 } from 'uuid';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { DBService } from '../db/db.service';

@Injectable()
export class TrackService {
  constructor(private dbService: DBService) {}

  public async findAll(): Promise<Track[]> {
    return this.dbService.getAllTracks();
  }

  public async findById(id: string): Promise<Track> {
    return this.dbService.getTrackById(id);
  }

  public async create(createTrackDto: CreateTrackDto) {
    const { name, albumId, artistId, duration } = createTrackDto;

    const newTrack: Track = {
      id: uuid4(),
      name,
      artistId,
      albumId,
      duration,
    };

    await this.dbService.createTrack(newTrack);
    return newTrack;
  }

  public async updateById(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.dbService.getTrackById(id);

    const updatedTrack: Track = {
      ...track,
      name: updateTrackDto.name ? updateTrackDto.name : track.name,
      artistId:
        updateTrackDto.artistId || updateTrackDto.artistId === null
          ? updateTrackDto.artistId
          : track.artistId,
      albumId:
        updateTrackDto.albumId || updateTrackDto.albumId === null
          ? updateTrackDto.albumId
          : track.albumId,
      duration: updateTrackDto.duration
        ? updateTrackDto.duration
        : track.duration,
    };

    await this.dbService.updateTrackById(id, updatedTrack);

    return updatedTrack;
  }

  public async deleteById(id: string) {
    await this.dbService.deleteTrackById(id);

    const favorites = await this.dbService.getFavoriteTracks();
    const isFav = favorites.includes(id);
    if (isFav) {
      await this.dbService.removeTrackFromFavoritesById(id);
    }
  }
}
