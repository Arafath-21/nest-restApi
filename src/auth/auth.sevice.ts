import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signUp() {
    return { msg: 'I signedup' };
  }
  signin() {
    return { msg: 'i signed in' };
  }
}
