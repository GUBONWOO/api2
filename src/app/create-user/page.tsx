'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter 가져오기

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // 비밀번호 상태 추가
  const [role, setRole] = useState('USER');

  const router = useRouter(); // useRouter 훅 사용

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }), // 비밀번호 추가
    });

    if (response.ok) {
      const data = await response.json();
      alert(`사용자 ${data.name}가 성공적으로 추가되었습니다!`);

      // 폼 리셋
      setName('');
      setEmail('');
      setPassword(''); // 비밀번호 리셋

      // 사용자 추가 후 페이지 리다이렉트
      router.push('/'); // 원하는 페이지로 변경
    } else {
      alert('사용자 추가에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>이름:</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
        <label htmlFor='password'>비밀번호:</label>{' '}
        {/* 비밀번호 입력 필드 추가 */}
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='role'>역할:</label>
        <select
          id='role'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value='USER'>사용자</option>
          <option value='ADMIN'>관리자</option>
        </select>
      </div>
      <button type='submit'>사용자 추가</button>
    </form>
  );
};

export default CreateUser;
