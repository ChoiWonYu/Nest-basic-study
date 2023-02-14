import { ArrayMaxSize, IsArray, MaxLength, IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @MaxLength(2200)
  caption: string;

  @IsString()
  hashtag: string;
}
