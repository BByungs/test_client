import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { gql, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';

const KAKAO_AUTH = gql`
  mutation kakaoAuth($code: CodeInput!) {
    kakaoAuth(code: $code) {
      code
    }
  }
`;

const Kakao = () => {
  const location = useLocation();
  const [code, setCode] = useState<
    string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined
  >('');
  // const [kakaoAuth, { data }] = useMutation(KAKAO_AUTH, {
  //   variables: { code: code },
  // });

  const [kakaoAuth] = useMutation(KAKAO_AUTH, {
    variables: {
      code: {
        code,
      },
    },
  });

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(location);
  };

  useEffect(() => {
    async function getToken() {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      setCode(code);
    }
    getToken();
    setTimeout(() => kakaoAuth(), 1000);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        style={{ width: '300px', marginTop: '30px', marginBottom: '20px' }}
        onClick={onClick}>
        login
      </button>
      <button style={{ width: '300px' }}>로그아웃</button>
    </div>
  );
};

export default Kakao;
