import React from "react";
import { Link } from "@reach/router";
import "./css/Nav.css";

function Nav({ topics }) {
  return (
    <nav className="Nav">
      <Link to={"/"} key="allTopics" className="Link">
        all articles
      </Link>
      {topics.map(topic => (
              <Link to={`/${topic.slug}`} key={topic.slug} className="Link">
              {topic.slug}
            </Link>
          ))}
    </nav>
  );
}

export default Nav;
