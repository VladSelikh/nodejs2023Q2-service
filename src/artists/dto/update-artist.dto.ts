import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto implements Omit<CreateArtistDto, 'name'> {
  grammy: boolean;
}
