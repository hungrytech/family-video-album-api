import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserResponse } from './dto/create-user.response';
import { CreateUserRequest } from './dto/create-user.request';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    return this.userService.create(createUserDto);
  }
}
