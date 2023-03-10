import { Logger, Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), EmailModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, Logger, EmailService],
  exports: [UsersService, EmailService, AuthService],
})
export class UsersModule {}
