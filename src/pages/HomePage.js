import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import '../styles/HomePage.css';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['business', 'technology', 'entertainment']; // Add more as needed

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=us&page=${currentPage}&pageSize=10&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
        if (category) {
          url += `&category=${category}`;
        }
        if (searchTerm) {
          url = `https://newsapi.org/v2/everything?q=${searchTerm}&page=${currentPage}&pageSize=10&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
        }
        const response = await axios.get(url);
        setArticles(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / 10));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="homepage">
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        onSelectCategory={setCategory}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && articles.length === 0 && <p>No articles found.</p>}
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
