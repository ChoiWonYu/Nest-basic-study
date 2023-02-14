import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { UserFromToken } from '../util/userFromToken.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') postId: string) {
    return this.postsService.getPostById(postId);
  }

  @Post()
  createPost(@UserFromToken() userId, @Body() createPostDTO: CreatePostDTO) {
    console.log(userId);
    return this.postsService.createPost(createPostDTO, userId);
  }

  @Patch('/:id')
  updatePost(
    @Param('id') postId: string,
    @Body() updatePostDTO: UpdatePostDTO,
    @UserFromToken() userId,
  ) {
    return this.postsService.updatePost(postId, updatePostDTO, userId);
  }

  @Delete('/:id')
  deletePost(@Param('id') postId: string, @UserFromToken() userId: string) {
    return this.postsService.deletePost(postId, userId);
  }
}
