import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { DataSource } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common/exceptions';
import { AuthService } from 'src/auth/auth.service';
import { UserInfo } from 'os';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private emailService: EmailService,
    private dataSource: DataSource,
    private authService: AuthService,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const userExist = await this.findUser(email);
    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }
    const signupVerifyToken = uuid.v1();
    //토큰 생성
    await this.saveUserUsingQueryRunner(
      name,
      email,
      password,
      signupVerifyToken,
    );
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async findUser(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  // private async saveUserUsingTransaction(
  //   name: string,
  //   email: string,
  //   password: string,
  //   signupVerifyToken: string,
  // ) {
  //   this.dataSource.transaction(async (manager) => {
  //     const user = new UserEntity();
  //     user.name = name;
  //     user.email = email;
  //     user.password = password;
  //     user.signupVerifyToken = signupVerifyToken;
  //     await manager.save(user);
  //   });
  // }

  private async saveUserUsingQueryRunner(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new UserEntity();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await queryRunner.manager.save(user);

      // throw new InternalServerErrorException();

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
    //이메일 기능은 따로 서비스 파일로 분리
    //회원가입 인증 이메일 발송
  }

  async verifyEmail(signupVerifyToken: string): Promise<Object> {
    const user = await this.userRepository.findOne({
      where: { signupVerifyToken },
    });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return this.authService.login(user);
  }

  async login(email: string, password): Promise<Object> {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return this.authService.login(user);
  }
  async getUserInfo(id: string): Promise<CreateUserDTO> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return user;
  }
}
