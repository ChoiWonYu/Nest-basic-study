import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostEntity } from './entity/post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts(): PostEntity[] {
    return this.postsService.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') postId: string): PostEntity {
    return this.postsService.getPostById(postId);
  }

  @Post()
  createPost(@Body() createPostDTO: CreatePostDTO): PostEntity {
    return this.postsService.createPost(createPostDTO);
  }

  @Patch('/:id')
  updatePost(
    @Param('id') postId: string,
    @Body() updatePostDTO: UpdatePostDTO,
  ): string {
    return this.postsService.updatePost(postId, updatePostDTO);
  }

  @Delete('/:id')
  deletePost(@Param('id') postId: string): string {
    return this.postsService.deletePost(postId);
  }
}
