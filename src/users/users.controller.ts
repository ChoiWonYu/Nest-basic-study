import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { VerifyEmailDTO } from './dto/verify-email.dto';

@Controller('users')
export class UsersController {
  @Get('/:id')
  getUserById(@Param('id') userId: string) {
    console.log(userId);
  }

  @Post()
  signUp(@Body() createUserDTO: CreateUserDTO) {
    console.log(createUserDTO);
  }

  @Post('/email-verify')
  verifyEmail(@Query() verifyEmailDTO: VerifyEmailDTO) {
    console.log(verifyEmailDTO);
  }

  @Post('/login')
  login(@Body() userLoginDTO: UserLoginDTO) {
    console.log(userLoginDTO);
  }
}
