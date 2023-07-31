import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto implements Partial<CreateAlbumDto> {
  name?: string;
  year?: number;
  artistId?: string | null;
}
