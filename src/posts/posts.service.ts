import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostEntity } from './entity/post.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostsService {
  private posts = [];

  getAllPosts(): PostEntity[] {
    return this.posts;
  }

  getPostById(postId: string): PostEntity {
    const targetPost = this.posts.find((post) => post.id === postId);
    if (!targetPost) {
      throw new BadRequestException();
    }
    return targetPost;
  }

  createPost(createPostDTO: CreatePostDTO): PostEntity {
    const { content, title } = createPostDTO;
    const newPost = {
      id: uuidv4(),
      content,
      title,
    };
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(postId: string, updatePostDTO: UpdatePostDTO): string {
    const { content, title } = updatePostDTO;
    const targetPost = this.getPostById(postId);
    this.posts = this.posts.map((post) => {
      if (post.id === postId)
        return {
          ...targetPost,
          title,
          content,
        };
      else return post;
    });
    return 'post is updated';
  }

  deletePost(postId: string): string {
    this.getPostById(postId);
    this.posts = this.posts.filter((post) => postId !== post.id);
    return 'post is deleted';
  }
}
