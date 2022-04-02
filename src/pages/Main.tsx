import React from 'react';
import Content from '../components/Content';
import List from '../components/List';

const Main = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Content />
      <List />
    </div>
  );
};

export default React.memo(Main);
