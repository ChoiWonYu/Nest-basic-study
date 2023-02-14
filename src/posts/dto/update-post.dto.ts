import { IsString, MaxLength, IsArray, ArrayMaxSize } from 'class-validator';

export class UpdatePostDTO {
  @IsString()
  @MaxLength(2200)
  caption: string;

  @IsString()
  hashtag: string;
}
