// src/lib/auth.ts
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return { id: String(user.id), name: user.name, email: user.email }; // id를 string으로 변환
        }
        return null; // 인증 실패 시 null 반환
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // 커스텀 로그인 페이지 경로
  },
};

export default NextAuth(authOptions); // NextAuth 설정 내보내기
