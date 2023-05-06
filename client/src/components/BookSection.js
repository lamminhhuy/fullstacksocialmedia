import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rate, Spin, Button } from 'antd';
import { addBookToShelf } from '../redux/actions/bookshelfAction';
import { searchBooks, getBookDetails } from "../redux/reducers/booksSlice";
import { postDataAPI } from '../utils/fetchData';
import { Link } from 'react-router-dom';
import BookFilter from './Bookfilter';
import { submitRating } from '../redux/reducers/ratingSlice';
import Booklist from './bookresults/booklist';
import { Menu } from 'antd';

export const BookSection = React.memo(({ keyword }) => {
  const dispatch = useDispatch();
  const { query, books, selectedBook, isLoading, error } = useSelector(
    (state) => state.book
  );

  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      dispatch(searchBooks(selectedCategory));
    } else {
      dispatch(searchBooks(keyword));
    }
  }, [selectedCategory, keyword, dispatch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const renderBookList = () => (
    <Booklist query={query} books={books} selectedBook={selectedBook} isLoading={isLoading} error={error} />
  );

  const renderLoadingError = () => {
    if (isLoading) {
      return <Spin tip="Loading..." />;
    } else if (error) {
      return <p>{error}</p>;
    } else {
      return null;
    }
  };

  return (
    <div className='container w-2/3'> 
      <div className='row'> 
        <div className='col-8'>
          {renderLoadingError()}
          <BookFilter onSelectCategory={handleCategorySelect} keyword={keyword}/>
          {renderBookList()}
        </div>
        <div className='col-4'>
          <div class="bg-white shadow rounded p-4">
            <h3 class="text-lg font-bold mb-2">Danh sách thể loại sách</h3>
            <Menu>
  <Menu.Item onClick={() => handleCategorySelect('Khoa học')}>Khoa học</Menu.Item>
  <Menu.Item onClick={() => handleCategorySelect('Văn học')}>Văn học</Menu.Item>
  <Menu.Item onClick={() => handleCategorySelect('Truyện tranh')}>Truyện tranh</Menu.Item>
  <Menu.Item onClick={() => handleCategorySelect('Chính trị')}>Chính trị</Menu.Item>
  <Menu.Item onClick={() => handleCategorySelect('Lịch sử')}>Lịch sử</Menu.Item>
  <Menu.Item onClick={() => handleCategorySelect('Tôn giáo')}>Tôn giáo</Menu.Item>
  <Menu.Item onClick={() => handleCategorySelect('Khác')}>Khác</Menu.Item>
</Menu>
</div>
</div>
</div>
</div>
);
});

export default BookSection;