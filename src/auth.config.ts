import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: '/login' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      const isOnDashboard = pathname === '/dashboard' || pathname.startsWith('/dashboard/');
      const isOnAuthPage = pathname === '/login' || pathname === '/register';

      if (isOnDashboard && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      if (isLoggedIn && isOnAuthPage) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // ログイン方法はauth.tsで設定
} satisfies NextAuthConfig
