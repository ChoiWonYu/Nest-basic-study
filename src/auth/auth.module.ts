import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigType } from '@nestjs/config';
import JwtConfig from 'src/config/JwtConfig';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [JwtConfig.KEY],
      useFactory: async (config: ConfigType<typeof JwtConfig>) => ({
        secret: config.secret,
        signOptions: {
          expiresIn: '60s',
        },
      }),
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [PassportModule, JwtService, JwtStrategy],
})
export class AuthModule {}
