import React from 'react';

const Home = () => {
  return (
    <div>
      <h2>HOME</h2>
      <a
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_CALLBACK}&response_type=code`}>
        <button>카카오 로그인하기</button>
      </a>
    </div>
  );
};

export default Home;
