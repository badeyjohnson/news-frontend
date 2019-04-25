import React from 'react';

const componentName = ({ logout }) => {
  return (
    <button onClick={() => logout()}>Logout</button>
  );
};

export default componentName;