import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '../../guards/local.guard';
import { Public } from '../../decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Public()

    @Post('sign-up')
    async signUp(@Body() body: { email: string, password: string })
    {
        return this.authService.signUp(body.email, body.password);
    }

    ////////////////////////////////////////////////////

    @Public()
    @UseGuards(LocalGuard)

    @Post('sign-in')
    async signIn(@Request() req): Promise<{ success: boolean; }> 
    {
      return this.authService.startSession(req);
    }

    ////////////////////////////////////////////////////

    @Post('sign-out')
    async logout(@Request() req) 
    {
      return this.authService.signOut(req);
    }
}
