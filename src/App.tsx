import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useState } from 'react';
import Content from './components/Content';
import List from './components/List';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

type ContentType = {
  content: string;
  id: string;
  createdAt: string;
  __typename: string;
};

function App() {
  const [contents, setContents] = useState<ContentType[]>([]);

  return (
    <ApolloProvider client={client}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Content setContents={setContents} />
        <List contents={contents} setContents={setContents} />
      </div>
    </ApolloProvider>
  );
}

export default App;
