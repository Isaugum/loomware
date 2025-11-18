import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { LocalGuard } from '@common/guards/local.guard';
import { Public } from '@common/decorators/public.decorator';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async signUp(
    @Body() body: { username: string; email: string; password: string },
    @Request() req,
  ) {
    return this.authService.signUp(
      body.username,
      body.email,
      body.password,
      req,
    );
  }

  ////////////////////////////////////////////////////

  @Public()
  @UseGuards(LocalGuard)
  @Post('sign-in')
  async signIn(
    @Request() req,
  ): Promise<{ user?: Partial<User>; success: boolean }> {
    return this.authService.startSession(req);
  }

  ////////////////////////////////////////////////////

  @Post('sign-out')
  async logout(@Request() req) {
    return this.authService.signOut(req);
  }
}
