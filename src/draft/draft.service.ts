import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { postEntity } from 'src/posts/entity/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(postEntity)
    private postRepository: Repository<postEntity>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDraft() {
    const draftPosts = await this.postRepository.find({
      where: {
        isPublished: false,
      },
    });

    draftPosts.map((post) => {
      if (this.IsExpired(post.createdDate)) {
        const deletedPostId = post.id;
        this.deleteDraftPosts(post.id);
        console.log(`${deletedPostId} post is deleted`);
      }
    });
  }

  IsExpired(createdDate: Date) {
    const EXPIRED_DAY = 7;
    const nowDate = new Date(Date.now());

    createdDate.setDate(createdDate.getDate() + EXPIRED_DAY);
    if (createdDate <= nowDate) {
      return true;
    }
    return false;
  }

  async deleteDraftPosts(postId) {
    await this.postRepository.delete(postId);
  }
}
