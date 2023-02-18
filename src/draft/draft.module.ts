import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postEntity } from 'src/posts/entity/post.entity';
import { DraftService } from './draft.service';

@Module({
  imports: [TypeOrmModule.forFeature([postEntity])],
  providers: [DraftService],
})
export class DraftModule {}
