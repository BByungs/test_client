/* eslint-disable react-hooks/exhaustive-deps */
import qs from 'qs';
import { useCallback, useEffect } from 'react';
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
  const [kakaoAuth] = useMutation(KAKAO_AUTH);

  const loginOrSignin = useCallback(async () => {
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const result = await kakaoAuth({
      variables: {
        code: {
          code,
        },
      },
    });
    if (result?.data?.kakaoAuth?.joined) {
      localStorage.setItem('users', JSON.stringify(result));
      navigate('/main');
    } else navigate('/join');
  }, []);

  useEffect(() => {
    loginOrSignin();
  }, []);

  return (
    <>
      <div>로딩중...</div>
    </>
  );
};

export default Kakao;
