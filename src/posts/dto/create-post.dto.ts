import { IsString, MinLength } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @MinLength(2)
  title: string;

  content: string;
}
