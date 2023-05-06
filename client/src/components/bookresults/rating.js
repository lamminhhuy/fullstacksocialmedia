import { Spin,Rate } from 'antd'
import React from 'react'
import { submitRating } from '../../redux/reducers/ratingSlice';
import { useDispatch, useSelector } from 'react-redux';
const Rating = ({isLoading, averageRating,bookId}) => { 
const dispatch =useDispatch()
const auth = useSelector(state => state.auth)
    const handleRatingChange = async (value,bookId) => {
        dispatch(submitRating({ bookId, rating: value,auth }));
      };
  return (
    <div>  <div className="d-inline-block">
    <div className="row">
      <div className="col text-center">
        <h2>Rate me</h2>
        {isLoading ? (
          <Spin />
        ) : (
          <Rate allowHalf value={averageRating} onChange={(value)=> handleRatingChange(value,bookId)} 
          />
        )}
      </div>
    </div>
  </div></div>
  )
}

export default Rating