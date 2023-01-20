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
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get('/:id')
  async getPostById(@Param('id') postId: number) {
    return await this.postsService.getPostById(postId);
  }

  @Post()
  async createPost(@Body() createPostDTO: CreatePostDTO) {
    return await this.postsService.createPost(createPostDTO);
  }

  @Patch('/:id')
  async updatePost(
    @Param('id') postId: number,
    @Body() updatePostDTO: UpdatePostDTO,
  ) {
    return await this.postsService.updatePost(postId, updatePostDTO);
  }

  @Delete('/:id')
  async deletePost(@Param('id') postId: number) {
    return await this.postsService.deletePost(postId);
  }
}
