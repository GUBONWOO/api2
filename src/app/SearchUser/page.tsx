'use client';

import { useState } from 'react';

const SearchEmailByName = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(''); // 이전 오류 메시지 초기화

    const response = await fetch(`/api/users?name=${name}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('data', data); // 데이터 구조 확인

      // 데이터가 배열일 경우 첫 번째 사용자 이메일 확인
      if (data.length > 0 && data[0].email) {
        setEmail(data[0].email); // 사용자 이메일 설정
      } else {
        setError('사용자를 찾을 수 없습니다.'); // 오류 메시지 설정
        setEmail(''); // 이메일 초기화
      }
    } else {
      setError('사용자 정보를 가져오는 데 실패했습니다.'); // 오류 메시지 설정
      setEmail(''); // 이메일 초기화
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
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
        <button type='submit'>이메일 검색</button>
      </form>
      {error && <p>{error}</p>} {/* 오류 메시지 출력 */}
      {email && (
        <div>
          <h3>이메일 정보</h3>
          <p>이메일: {email}</p>
        </div>
      )}
    </div>
  );
};

export default SearchEmailByName;
