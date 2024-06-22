import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';  // Update import path

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <Link to={`/article/${article.id}`}>
        <h2>{article.title}</h2>
        <img src={article.urlToImage} alt={article.title} />
        <p>{article.description}</p>
      </Link>
    </div>
  );
};

export default ArticleCard;
