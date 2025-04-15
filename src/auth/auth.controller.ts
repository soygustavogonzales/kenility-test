import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    // Validate user credentials here
    const user = { userId: 1, username: 'test' }; // Mock user
    return this.authService.login(user);
  }
}
