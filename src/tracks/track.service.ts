import { Injectable } from '@nestjs/common';
import { Track } from 'src/tracks/interfaces/track.interface';
import { v4 as uuid4 } from 'uuid';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  public findAll(): Track[] {
    return this.tracks;
  }

  public findById(id: string): Track {
    return this.tracks.find((track) => track.id === id);
  }

  public create(createTrackDto: CreateTrackDto) {
    const { name, albumId, artistId, duration } = createTrackDto;

    const newTrack: Track = {
      id: uuid4(),
      name,
      artistId,
      albumId,
      duration,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  public updateById(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findById(id);

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

    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks[index] = updatedTrack;

    return updatedTrack;
  }

  public deleteById(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
  }
}
