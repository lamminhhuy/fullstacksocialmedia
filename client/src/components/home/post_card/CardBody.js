import React, { useEffect, useState } from 'react'
import Carousel from '../../Carousel'
import { useSelector, useDispatch } from 'react-redux';
import { Rate,Spin } from 'antd';
import { addBookToShelf } from '../../../redux/actions/bookshelfAction';
import { Link } from 'react-router-dom';
const CardBody = ({post, theme}) => {
    const [readMore, setReadMore] = useState(false);
    const [maxLength, setMaxLength] = useState(200);
    const { drawers} = useSelector (state => state.bookshelf)

    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.book);
    const {user} = useSelector((state)=> state.auth)
 
    const [isLoading, setIsLoading] = useState(false)
  const {auth} = useSelector(state=> state);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleFullDescription = () => {
    setShowFullDescription(!showFullDescription);
}
const toggleReadMore = () => {
  setReadMore(!readMore);
}
  const addbook =(name,user_id, book,auth) =>{

    dispatch(addBookToShelf({name,user_id, book,auth}));
  }
  const handleOptionClick = (option,user_id, book,auth) => {

    dispatch(addBookToShelf({name:option,user_id,book ,auth}));
  };
  const truncatedDescription = showFullDescription ? post.book?.description : post.book?.description?.substring(0, maxLength);

  const shouldRenderReadMore = post.book?.description?.length > maxLength && !showFullDescription;
    return (
  
    <div className="card_body">
    <div
      className="card_body-content row"
      style={{
        filter: theme ? "invert(1)" : "invert(0)",
        color: theme ? "white" : "#111",
      }}
    >
      <div className="col-md-4 col-sm-12 mb-3">
        <Link to={`book/show/${post.book?.googleBooksId ?? ""}`}>
          <img
            className="h-100 w-100 object-contain"
            src={post.book ? post.book.coverImage : null}
          />
        </Link>
      </div>
  
      <div className="col-md-8 col-sm-12">
        <h2 className="font-bold">{post.book ? post.book.title : null}</h2>
        <p>by {post.book ? post.book.author : null}</p>
        <div
      className="dropdown max-h-full mb-3 "
     
    > 
      <button value="Want to Read" onClick ={(e)=>addbook(e.target.value,user._id,post.book,auth)}className="btn btn-outline-secondary w-85 rounded-0">
        <i className="fas fa-check"></i> Want to Read
      </button>
      <button
className="btn btn-outline-secondary dropdown-toggle w-15 border-left-0 rounded-0"
type="button"
id="menu1"
data-toggle="dropdown"
></button>     <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">  {drawers && drawers.filter((drawer) => drawer.name !== "Want to Read").map((drawer) => (
  <li role="presentation">
    <a
      role="menuitem"
      tabIndex="-1"
      href="#"
      onClick={() => addbook(drawer.name, user._id, post.book, auth)}
    >
      {drawer.name} 
    </a>
  </li>
))}

</ul>
    </div>
        <p className="text-sm">{truncatedDescription}</p>
        {shouldRenderReadMore && (
          <span
            onClick={toggleFullDescription}
            className="text-primary cursor-pointer"
          >
            {showFullDescription ? "Show less" : "Read more"}
          </span>
        )}
        <p className="text-sm">Genre: {post?.book?.genre}</p>
      </div>
    </div>
  </div>
  
    )
}

export default CardBody