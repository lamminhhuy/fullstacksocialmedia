import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {recommendBooks, suggestbook, setQuery, searchBooks } from '../../redux/reducers/booksSlice';
import BookCard from '../BookCard';

const Search = () => {
  const {user} = useSelector(state=>state.auth)
  const [query, setQueryValue] = useState('');
  const booksuggestion = useSelector((state) => state.book.booksuggestion);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleonchangeSearch = (event) => {
    const query = event.target.value;
    setQueryValue(query);

    dispatch(suggestbook(query));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      history('/search/' + query);
      dispatch(setQuery(query))
      dispatch(recommendBooks({querybook: query,userId:user._id}))
    } else {
      history('/');
    }
  };

  return (
    <div className='w-1/4 relative'>

    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        value={query}
        id="search"
        title="Enter to Search" placeholder="Searchs books"
        onChange={handleonchangeSearch}
      />
<div className="absolute w-full h-full">    {booksuggestion && (
        <div className='absolute z-10 w-full bg-white border border-gray-300   rounded-b-md'>
          {booksuggestion.slice(0,4).map((book) => (
           <Link  to={`/book/show/${book.bookId}`}> <BookCard key={book.bookId} book={book} /></Link>
          ))}
        </div>
      ) }</div>

    </form>

    </div>
  );
};

export default Search;
