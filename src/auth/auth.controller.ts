import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    // HttpStatus로 Resposne 반환
    // https://docs.nestjs.com/controllers
    @Res() res: Response,
    @Body() body: { email: string; password: string; role: 'buyer' | 'seller' },
  ) {
    const data = await this.authService.register(body);
    if (data.result) res.status(HttpStatus.CREATED).json(data);
    else res.status(HttpStatus.CONFLICT).json(data);
  }

  @Post('login')
  async login(
    @Res() res: Response,
    @Body() body: { email: string; password: string },
  ) {
    const data = await this.authService.login(body);
    if (!data) res.status(HttpStatus.UNAUTHORIZED).json(data);
    else res.status(HttpStatus.ACCEPTED).json(data);
  }
}
