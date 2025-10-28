import { Endpoints } from '@/core/enums/endpoints.enum';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicPaths = [String(Endpoints.SIGN_IN), String(Endpoints.SIGN_UP)];

  if (!publicPaths.includes(pathname)) {
    const session = req.cookies.get('session')?.value;

    if (!session) {
      return NextResponse.redirect(new URL(Endpoints.SIGN_IN, req.url));
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};