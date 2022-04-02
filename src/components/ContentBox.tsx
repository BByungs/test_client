import { gql, useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FETCH_CONTENTS } from './List';

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
};

const ContentBox = ({ content }: ContentBoxParams) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [updateContent] = useMutation(UPDATE_CONTENT);
  const [deleteContent] = useMutation(DELETE_CONTENT);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleUpdate = useCallback(
    async (id: string, text: string) => {
      updateContent({
        variables: {
          id,
          contentInput: {
            content: text,
          },
        },
        refetchQueries: [
          {
            query: FETCH_CONTENTS,
          },
        ],
      });
      setOpen((prev) => !prev);
    },
    [updateContent]
  );

  const handleDeleteButton = useCallback(
    async (id: String) => {
      deleteContent({
        variables: {
          id,
        },
        refetchQueries: [
          {
            query: FETCH_CONTENTS,
          },
        ],
      });
    },
    [deleteContent]
  );

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

export default React.memo(ContentBox);
