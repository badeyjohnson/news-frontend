import React from 'react';
import { Link } from '@reach/router'

function NotFound( props ) {
  return (
    <div>
      <h1>404 page not found</h1>
      <p>{props.location.state.msg}</p>
      <Link to={'/'} className="Link">Back to home</Link>
    </div>
  );
}

export default NotFound;
