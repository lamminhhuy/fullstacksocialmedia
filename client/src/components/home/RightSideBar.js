import React, { useEffect, useMemo, useCallback } from 'react'

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Carousel ,Button} from 'antd';
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import LoadIcon from '../../images/loading.gif'
import { getSuggestions } from '../../redux/actions/suggestionsAction'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LeftOutlined,RightOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { getSearchHistory, recommendBooks } from '../../redux/reducers/booksSlice';


const RightSideBar = () => {
 
    const dispatch = useDispatch()
    const prevArrow = <Button shape="circle" icon={<LeftOutlined />} />;
    const nextArrow = <Button shape="circle" icon={<RightOutlined />} />;
    const { auth, suggestions, book: { recommendedBooks, query } } = useSelector(state => state);
       // Use shallowEqual to prevent unnecessary re-renders
       const fetchRecommendedBooks = useCallback(() => {
        dispatch(getSearchHistory(auth.user._id)).then((data) => {
   
          dispatch(recommendBooks({querybook:data.payload, userId:auth.user._id}))
        })
      }, [auth.user._id]);
      useEffect(() => {
        fetchRecommendedBooks()
      }, []);
      
    return (
        <div className="mt-3">
            <UserCard user={auth.user} />    
            <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-danger">Recommeded books for you</h5>
         
            </div>       
              <Carousel autoplay prevArrow={prevArrow} nextArrow={nextArrow} >
            {recommendedBooks && recommendedBooks.map((book) => (
                <div className='w-full h-full'>
  <div class=" gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div class="bg-white shadow-md rounded-lg">
    <div class="w-full h-64">
 <Link to={`/book/show/${book.bookId}`}> <img src={`${book.cover_i ?? book.imageLinks?.thumbnail}`} alt="Book 1"  className='w-full h-full transform scale-x-150 object-none'/></Link>  
</div>    
      <h2 class="text-lg font-bold my-2">{book.title}</h2>
      <p class="text-gray-500 text-sm mb-2">Author: {book.author_name}</p>
      <p class="text-gray-500 text-sm mb-2">Genre: {book.genre}</p>
   </div>
    </div>  </div>
    ))} 
    </Carousel></div>
)}

export default RightSideBar
