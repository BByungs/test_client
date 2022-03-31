import { useState } from 'react';
import Content from '../components/Content';
import List from '../components/List';

type ContentType = {
  content: string;
  id: string;
  createdAt: string;
  __typename: string;
};

const Main = () => {
  const [contents, setContents] = useState<ContentType[]>([]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}>
      <Content setContents={setContents} />
      <List contents={contents} setContents={setContents} />
    </div>
  );
};

export default Main;
