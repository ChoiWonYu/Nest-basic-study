import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { BatchController } from './batch.controller';
import { DraftService } from './draft.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postEntity } from 'src/posts/entity/post.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([postEntity]),
    LoggerModule,
  ],
  providers: [TaskService, DraftService],
  controllers: [BatchController],
  exports: [DraftService, TaskService],
})
export class BatchModule {}
