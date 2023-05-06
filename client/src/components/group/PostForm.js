import axios from 'axios';
import React, { useState } from 'react';
import { postDataAPI } from '../../utils/fetchData';
import { postAdded } from '../../redux/reducers/groupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { useParams } from 'react-router-dom';
import { POST_TYPES } from '../../redux/actions/bookshelfAction';

function PostForm({auth,groupId}) {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch()
const [formData, setFormData] = useState({
    content: '',
    book: null,
    groupId: groupId,
  });
  const handleChangeTitle = (event) => {
    const title = event.target.value;
  
    if (title.length > 2) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=5&langRestrict=en+vi`)
        .then((response) => response.json())
        .then((data) => {
          const filteredBooks = data.items.filter(book => book.volumeInfo.imageLinks);
          setBooks(filteredBooks);
        });
    } else {
      setBooks([]);
    }
  };
  
  const handleSelectBook = (book) => {
    document.getElementById('title').value = book.volumeInfo.title;
    setFormData({...formData,book :book});
    setBooks([]);
  };
const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
    
      const response = await postDataAPI('posts',formData, auth.token);
console.log(formData.groupId)
if(!groupId)
{
dispatch({type:POST_TYPES.CREATE_POST, payload:response.data});
}else{
  dispatch(postAdded(response.data))
}
    } catch (error) {
      console.error(error);
    }
}
  return (
   
    <div className="status_modal relative">
    <form className="space-y-6 mt-20  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" action="#" method="POST" >
      <div className=''>
     <div className="relative"> 
      <span className="absolute right-0 cursor-pointer"onClick={() => dispatch({
                        type: GLOBALTYPES.STATUS, payload: false
                    })}>
                        &times;
                    </span></div> 
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Book Name</label>
        <div className="mt-1 relative">
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
            onChange={handleChangeTitle}
          />
          {books.length > 0 && (
            <ul className="absolute z-10 top-full left-0 bg-white border border-gray-300 rounded-md shadow-md mt-1 w-full max-h-40 overflow-y-auto">
              {books.map((book) => (
                <li
                  key={book.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectBook(book)}
                >
                  {book.volumeInfo.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <div className="mt-1">
          <textarea
            id="content"
            name="content"
            rows="10"
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
            onChange={(e) => setFormData({...formData, content: e.target.value})} ></textarea>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={submitFormHandler}>
          Post
          </button>
          </div>
          </form>
    </div>
              );
     
 }
              export default PostForm;
