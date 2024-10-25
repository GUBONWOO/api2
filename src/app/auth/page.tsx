'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface LoginProps {
  onLoginSuccess: () => void; // Props 타입 정의
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert('로그인 실패: ' + result.error);
    } else {
      onLoginSuccess(); // 로그인 성공 시 onLoginSuccess 호출
      router.push('/main'); // 대시보드로 이동
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='email'>이메일:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='password'>비밀번호:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type='submit'>로그인</button>
      <p>
        아직 회원이 아니신가요? <a href='/create-user'>가입하기</a>
      </p>
    </form>
  );
};

export default Login;
