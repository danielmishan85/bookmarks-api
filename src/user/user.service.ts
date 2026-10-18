import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EditUserDto } from './dto/index.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: string, dto: EditUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...dto,
        },
      });

      const { hash, ...userWithoutHash } = user;
      return userWithoutHash;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
