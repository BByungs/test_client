import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { gql, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
// import Main from './Main';
// import Join from './Join';

const KAKAO_AUTH = gql`
  mutation kakaoAuth($code: CodeInput!) {
    kakaoAuth(code: $code) {
      data {
        email
        isAdmin
        phoneNumber
        profile {
          nickname
          thumbnail_image_url
          profile_image_url
        }
      }
      joined
    }
  }
`;

const Kakao = () => {
  const location = useLocation();
  const [code, setCode] = useState<
    string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined
  >('');

  const [kakaoAuth, { data }] = useMutation(KAKAO_AUTH, {
    variables: {
      code: {
        code,
      },
    },
  });

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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {data?.kakaoAuth?.joined ? (
        <div>회원가입된 아이디</div>
      ) : (
        <div>회원가입 안된 아이디</div>
      )}
    </>
  );
};

export default Kakao;
