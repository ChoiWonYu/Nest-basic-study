import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/users/entity/user.entity';
import { UsersModule } from 'src/users/users.module';
import { postEntity } from './entity/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([postEntity, UserEntity]),
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, AuthService, UsersService],
  exports: [PostsService, AuthService, UsersService],
})
export class PostsModule {}
