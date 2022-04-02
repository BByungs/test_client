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

const Kakao = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const [KakaoAuth] = useMutation(KAKAO_AUTH);

  const loginOrSignup = useCallback(async () => {
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const {
      data: { kakaoAuth },
    } = await KakaoAuth({
      variables: {
        code: {
          code,
        },
      },
    });
    console.log(kakaoAuth);
    if (kakaoAuth?.joined) {
      localStorage.setItem('users', JSON.stringify(kakaoAuth));
      navigate('/main');
    } else navigate('/join');
  }, []);

  useEffect(() => {
    loginOrSignup();
  }, []);

  return <div>로딩중...</div>;
};

export default Kakao;
