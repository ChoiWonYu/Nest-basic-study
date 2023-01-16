import { Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  async getAllPosts() {
    return 'get all posts';
  }

  async getPostById(postId: number) {
    return `get post Id ${postId}`;
  }

  async createPost(createPostDTO: CreatePostDTO) {
    const { content, title } = createPostDTO;
    return `create post content:${content} title:${title}`;
  }

  async updatePost(postId: number, updatePostDTO: UpdatePostDTO) {
    const { content, title } = updatePostDTO;
    return `update post content:${content}, title:${title}`;
  }

  async deletePost(postId: number) {
    return `delete post Id ${postId}`;
  }
}
