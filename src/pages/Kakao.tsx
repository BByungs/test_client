import React, { useEffect } from 'react';
import qs from 'qs';
import { gql, useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [kakaoAuth, { data }] = useMutation(KAKAO_AUTH);

  async function getToken() {
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    kakaoAuth({
      variables: {
        code: {
          code,
        },
      },
    });
  }

  useEffect(() => {
    getToken();
    if (data?.kakaoAuth?.joined) {
      console.log(data.kakaoAuth);
      localStorage.setItem('users', JSON.stringify(data));
      navigate('/main');
    } else {
      navigate('/join');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>로딩중...</div>
    </>
  );
};

export default Kakao;
