import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    if (!req.session || !req.session.userId) {
      throw new UnauthorizedException('Not logged in');
    }
    
    req.userId = req.session.userId;
    return true;
  }
}