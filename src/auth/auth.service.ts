import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import JwtConfig from 'src/config/JwtConfig';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(JwtConfig.KEY) readonly config: ConfigType<typeof JwtConfig>,
  ) {}

  async login(user: UserEntity) {
    const payload = { username: user.name, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.config.secret,
      }),
    };
  }
}
