import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { VerifyEmailDTO } from './dto/verify-email.dto';
import { ValidationPipe } from 'src/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(ValidationPipe) dto: CreateUserDTO): Promise<void> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  //이메일 인증
  async verifyEmail(@Query() dto: VerifyEmailDTO) {
    const { signupVerifyToken } = dto;
    await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  //로그인
  async login(@Body() dto: UserLoginDTO) {
    const { email, password } = dto;
    await this.usersService.login(email, password);
  }

  @Get('/:id')
  //회원 조회
  async getUserInfo(@Param('id') id: string): Promise<string> {
    return await this.usersService.getUserInfo(id);
  }
}
