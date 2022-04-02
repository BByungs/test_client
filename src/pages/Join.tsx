import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Input = styled.input``;

const Row = styled.div`
  display: flex;
`;

const Join = () => {
  return (
    <Wrapper>
      <Row>
        <div>핸드폰 번호: </div>
        <Input type="text" />
      </Row>

      <select>
        <option value="admin">관리자</option>
        <option value="user">일반 사용자</option>
      </select>
    </Wrapper>
  );
};

export default Join;
