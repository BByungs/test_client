import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import styled from 'styled-components';

const UPDATE_CONTENT = gql`
  mutation updateContent($id: ID!, $contentInput: ContentInput) {
    updateContent(id: $id, contentInput: $contentInput) {
      id
      content
    }
  }
`;

const DELETE_CONTENT = gql`
  mutation deleteContent($id: ID!) {
    deleteContent(id: $id) {
      id
      content
    }
  }
`;

type ContentType = {
  content: string;
  id: string;
  createdAt: string;
  __typename: string;
};

type ContentBoxParams = {
  content: ContentType;
  contents: ContentType[];
  setContents: React.Dispatch<React.SetStateAction<ContentType[]>>;
};

const ContentBox = ({ content, contents, setContents }: ContentBoxParams) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [updateContent] = useMutation(UPDATE_CONTENT);
  const [deleteContent] = useMutation(DELETE_CONTENT);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleUpdate = async (id: string, text: string) => {
    const result = await updateContent({
      variables: {
        id,
        contentInput: {
          content: text,
        },
      },
    });
    const copyContents = [...contents];
    const deepCopy = copyContents.map((data) => {
      const copyData = { ...data };
      if (copyData.id === id) {
        copyData.content = result.data.updateContent.content;
      }
      return copyData;
    });
    setContents(deepCopy);
    setOpen((prev) => !prev);
  };

  const handleDeleteButton = async (id: String) => {
    const result = await deleteContent({
      variables: {
        id,
      },
    });
    const filterData = contents.filter(
      (el) => el.id !== result.data.deleteContent.id
    );
    setContents(filterData);
  };

  return (
    <>
      {open ? (
        <div style={{ display: 'flex' }}>
          <input type="text" onChange={handleInput} />
          <button onClick={() => handleUpdate(content.id, text)}>
            수정하기
          </button>
        </div>
      ) : (
        <Row key={content.id}>
          <div>
            {content.content.length > 27
              ? `${content.content.slice(0, 27)}...`
              : content.content}
          </div>
          <ButtonWrapper>
            <Button onClick={() => handleDeleteButton(content.id)}>삭제</Button>
            <Button onClick={() => setOpen((prev) => !prev)}>수정</Button>
          </ButtonWrapper>
        </Row>
      )}
    </>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 300px;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: rgb(0 0 0 / 30%) 0px 12px 40px -12px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 90px;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 8px;
  height: 25px;
  font-size: 12px;
  width: 40px;
  background-color: #64b5f6;
  color: white;
`;

export default ContentBox;
