import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { postEntity } from './entity/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([postEntity, UserEntity])],
  controllers: [PostsController],
  providers: [PostsService, AuthService],
})
export class PostsModule {}
