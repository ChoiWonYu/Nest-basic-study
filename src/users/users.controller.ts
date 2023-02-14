import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Inject,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { VerifyEmailDTO } from './dto/verify-email.dto';
import { UseFilters, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserInfo } from './types/UserInfo';
import { HttpExceptionFilter } from 'src/exception/HttpException.filter';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly usersService: UsersService,
  ) {}

  private printWinstonLog(dto) {}

  @Post()
  async create(@Body() dto: CreateUserDTO): Promise<void> {
    this.printWinstonLog(dto);

    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  //이메일 인증
  async verifyEmail(@Query() dto: VerifyEmailDTO) {
    const { signupVerifyToken } = dto;
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  //로그인
  async login(@Body() dto: UserLoginDTO) {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  //회원 조회
  async getUserInfo(@Param('id') id: string): Promise<UserInfo> {
    return await this.usersService.getUserInfo(id);
  }
}
