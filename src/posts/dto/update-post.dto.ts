import { IsString, MinLength } from 'class-validator';

export class UpdatePostDTO {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(4)
  content: string;
}
