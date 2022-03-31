import { gql, useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

type ContentType = {
  content: string;
  id: string;
  createdAt: string;
  __typename: string;
};
type ContentParams = {
  setContents: Dispatch<SetStateAction<ContentType[]>>;
};

const CREATE_CONTENT = gql`
  mutation createContent($contentInput: ContentInput) {
    createContent(contentInput: $contentInput) {
      id
      content
      createdAt
    }
  }
`;

const Content = ({ setContents }: ContentParams) => {
  const [text, setText] = useState<string>('');
  const [createContent] = useMutation(CREATE_CONTENT);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleContentSubmit = async () => {
    const data = await createContent({
      variables: {
        contentInput: {
          content: text,
        },
      },
    });
    setContents((prev) => [...prev, data.data.createContent]);
  };

  return (
    <Col>
      <h1 style={{ marginBottom: '10px', marginTop: '100px' }}>게시글 등록</h1>
      <Input type="text" onChange={handleInput} />

      <button style={{ marginRight: '10px' }} onClick={handleContentSubmit}>
        등록
      </button>
    </Col>
  );
};

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 300px;
  margin-bottom: 10px;
`;

export default Content;
