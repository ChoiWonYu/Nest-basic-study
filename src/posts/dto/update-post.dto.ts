import { IsString, MinLength } from 'class-validator';

export class UpdatePostDTO {
  @IsString()
  @MinLength(2)
  title: string;

  content: string;
}
