'use client';

import { useState } from 'react';
import FileUpload from '../fileupload/page';
import Login from '../auth/page';
import SearchUser from '../SearchUser/page';

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <SearchUser />
          <FileUpload />
        </>
      )}
    </div>
  );
};

export default Main;
