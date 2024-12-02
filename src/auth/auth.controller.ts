import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.sevice';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() _dto: AuthDto) {
    console.log(_dto);

    return this.authService.signup(_dto);
  }
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
