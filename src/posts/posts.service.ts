import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { postEntity } from './entity/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(postEntity)
    private postRepository: Repository<postEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllPosts(): Promise<postEntity[]> {
    return await this.postRepository.find();
  }

  async getPostById(postId: string): Promise<postEntity> {
    const targetPost = this.postRepository.findOne({ where: { id: postId } });
    if (!targetPost) {
      throw new BadRequestException();
    }
    return targetPost;
  }

  async createPost(createPostDTO: CreatePostDTO, userId) {
    const { caption, hashtag } = createPostDTO;
    console.log(userId);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const newPost = {
      caption,
      hashtag,
      user,
    };
    await this.postRepository.save(newPost);
    return newPost;
  }

  async updatePost(
    postId: string,
    updatePostDTO: UpdatePostDTO,
    userId: string,
  ): Promise<string> {
    const targetPost = await this.postRepository.findOne({
      where: { id: postId },
    });
    console.log(targetPost);
    // if (targetPost.user.id !== userId) {
    //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    // }
    await this.postRepository.update(postId, updatePostDTO);
    return 'post is updated';
  }

  async deletePost(postId: string): Promise<string> {
    this.getPostById(postId);
    await this.postRepository.delete(postId);
    return 'post is deleted';
  }
}
