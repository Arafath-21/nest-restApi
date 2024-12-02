import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(_dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(_dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: _dto.email,
          hash: hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Email Already Exists, please try to login',
          );
        }
      }
      throw error;
    }
  }

  signin() {
    return { msg: 'i signed in' };
  }
}
