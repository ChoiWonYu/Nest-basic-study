import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private emailService: EmailService,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }
    const signupVerifyToken = uuid.v1();
    //토큰 생성
    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async checkUserExists(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    console.log(user);
    return user !== null;
  }

  async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    user.id = ulid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.userRepository.save(user);
  }

  async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
    //이메일 기능은 따로 서비스 파일로 분리
    //회원가입 인증 이메일 발송
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    throw new Error('Method not implement');
  }
  async login(email: string, password): Promise<string> {
    throw new Error('Method not implement');
  }
  async getUserInfo(id: string): Promise<string> {
    throw new Error('Method not implement');
  }
}
