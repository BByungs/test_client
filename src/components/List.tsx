import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import ContentBox from './ContentBox';

type ContentType = {
  content: string;
  id: string;
  createdAt: string;
  __typename: string;
};

export const FETCH_CONTENTS = gql`
  query fetchContents {
    fetchContents {
      id
      content
    }
  }
`;

const List = () => {
  const { loading, error, data } = useQuery(FETCH_CONTENTS);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <Wrapper>
      {data.fetchContents.map((content: ContentType) => (
        <ContentBox key={content.id} content={content} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default List;
