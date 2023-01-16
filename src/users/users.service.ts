import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}
  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();
    //토큰 생성

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async checkUserExists(email: string) {
    return false;
    //DB 공부 이후 추가 예정
  }
  async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return;
    //DB 공부 이후 추가 예정
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
