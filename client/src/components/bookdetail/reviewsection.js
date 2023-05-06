import { Spin } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../redux/reducers/reviewSlice';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Reviewsection = ({bookId}) => {
  const [reviewText, setReviewText] = useState('');
  const {user} = useSelector (state => state.auth)
  
const dispatch = useDispatch();
const {isLoading,error} = useSelector(state => state.review)
  const handleSubmit = (event) => {
  
    event.preventDefault();
    dispatch(addReview({ userId :user._id,bookId,reviewText:reviewText}))
    
    setReviewText('');
  };
 
  return (
    <div>
      <div className="mt-2 py-8  bg-white rounded-lg shadow-md hover:shadow-lg p-4">
        <h2 className="text-2xl font-bold text-center mb-8">Ratings & Reviews</h2>
        <div className="max-w-lg mx-auto">
          <div className="border-b-2 border-gray-300 pb-4 mb-4">
            <h3 className="text-lg font-bold mb-2">My Review</h3>
            <p className="text-gray-600 mb-2">Lâm Minh</p>
            <p className="text-gray-600">No reviews yet.</p>
          </div>
          <form className="mb-4" onSubmit={handleSubmit}>
            <label className="block font-bold mb-2" htmlFor="review">
              Write a Review
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              id="review"
              name="review"
              rows="4"
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
            ></textarea>
             { isLoading ? (<Spin/>):(
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              type="submit"
            >
              Submit Review
            </button>)}
          </form>
          <div className="border-b-2 border-gray-300 pb-4 mb-4">
            <h3 className="text-lg font-bold mb-2">Reviews</h3>
            <div className="mb-4">
              <p className="text-gray-600">No reviews yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviewsection;
