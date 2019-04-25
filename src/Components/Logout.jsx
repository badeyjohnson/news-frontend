import React from "react";

const componentName = ({ logout, user }) => {
  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
      <p>{user}</p>
    </div>
  );
};

export default componentName;
