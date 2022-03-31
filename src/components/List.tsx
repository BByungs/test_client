import { gql, useQuery } from '@apollo/client';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import ContentBox from './ContentBox';

type ContentType = {
  content: string;
  id: string;
  createdAt: string;
  __typename: string;
};

type ListParams = {
  contents: ContentType[];
  setContents: Dispatch<SetStateAction<ContentType[]>>;
};

const FETCH_CONTENTS = gql`
  query fetchContents {
    fetchContents {
      id
      content
    }
  }
`;

const List = ({ contents, setContents }: ListParams) => {
  const { data } = useQuery(FETCH_CONTENTS);

  useEffect(() => {
    if (data && data.fetchContents) {
      setContents(data.fetchContents);
    }
  }, [data, setContents]);

  return (
    <Wrapper>
      {contents?.map((content: ContentType) => (
        <ContentBox
          key={content.id}
          content={content}
          contents={contents}
          setContents={setContents}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default List;
