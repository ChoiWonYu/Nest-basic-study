import { IsString, MaxLength, IsArray, ArrayMaxSize } from 'class-validator';

export class UpdatePostDTO {
  @IsString()
  @MaxLength(2200)
  caption: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(30)
  hashtag: string[];
}
