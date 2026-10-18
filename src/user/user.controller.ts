import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/index.js';
import { GetUser } from '../auth/decorator/index.js';
import { User } from '../generated/prisma/client.js';
import { EditUserDto } from './dto/index.js';
import { UserService } from './user.service.js';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: Omit<User, 'hash'>) {
    console.log({ user: user });
    return {
      user: user,
    };
  }

  @Patch()
  editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
