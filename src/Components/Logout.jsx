import React from "react";

const componentName = ({ logout, user }) => {
  return (
    <div className="Logout">
      <button id="logout" onClick={() => logout()}>{`Logout ${user}`}</button>
    </div>
  );
};

export default componentName;
