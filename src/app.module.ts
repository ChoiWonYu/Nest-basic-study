import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import DBConfig from './config/DBConfig';
import { AuthModule } from './auth/auth.module';
import { ExceptionModule } from './exception/exception.module';
import { BatchModule } from './batch/batch.module';
import JwtConfig from 'src/config/JwtConfig';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, DBConfig, JwtConfig],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DBConfig.KEY],
      useFactory: (config: ConfigType<typeof DBConfig>) => ({
        type: 'mysql',
        host: config.host,
        port: +config.port,
        username: config.userName,
        password: config.password,
        database: config.database,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    ScheduleModule.forRoot(),
    PostsModule,
    UsersModule,
    AuthModule,
    ExceptionModule,
    BatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
