import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth'; // NextAuth 설정 파일 가져오기

// NextAuth 핸들러 생성
const handler = NextAuth(authOptions);

// GET 및 POST 메서드에 대해 핸들러를 내보내기
export { handler as GET, handler as POST };
