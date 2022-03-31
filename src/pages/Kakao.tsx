import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { gql, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';

const KAKAO_AUTH = gql`
  mutation kakaoAuth($code: String!) {
    kakaoAuth(code: $code)
  }
`;

const Kakao = () => {
  const location = useLocation();
  const [code, setCode] = useState<
    string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined
  >('');
  const [kakaoAuth, { data }] = useMutation(KAKAO_AUTH, {
    variables: { code: code },
  });

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(location);
    // console.log(data.kakaoAuth);
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

  return <button onClick={onClick}>login</button>;
};

export default Kakao;
