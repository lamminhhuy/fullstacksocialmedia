import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reviewscommunity from '../components/bookdetail/reviewscommunity'
import Reviewsection from '../components/bookdetail/reviewsection'
import {  getBookDetails } from "../redux/reducers/booksSlice";
import { useDispatch, useSelector } from 'react-redux'
import  {getaBook}  from '../redux/actions/bookAction'
import { Spin } from 'antd'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

const Bookdetail = () => {
const dispatch = useDispatch ()
const  {id} = useParams ()
const  {books,selectedBook,isLoading} = useSelector(state=> state.book)
const [date, setDate] = useState("");  
const [object,setobject] = useState("");
const colref = useRef(null);
const [authorId, setAuthorId] = useState(null);
const [bio, setBio] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(()=> {
  window.addEventListener('scroll', () => {
    if (colref.current && window.pageYOffset > 500) {
      colref.current.classList.remove('fixed');
    } else if (colref.current) {
      colref.current.classList.add('fixed');
    }
 
  });
  
dispatch(getBookDetails(id))
const date = new Date(selectedBook? selectedBook.publicationDate: 0 );
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const formattedDate = `${day}/${month}/${year}`;
setDate(formattedDate)

  },[])
  useEffect(() => {
    if(selectedBook)
    {   fetchAuthorId()
    }
  }, [selectedBook]);
  const fetchAuthorId = async () => {
    try {
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${selectedBook.author}`);
      setBio(response.data.extract);
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <div className='w-2/3 mt-4' >
      
      {selectedBook && (
<div className='flex flex-row gap-1'>
<div class="col-3 fixed"  ref={colref}> 
{isLoading ? <Spin style={{ position: 'absolute', top: '50%', left: '28%', transform: 'translate(-50%, -50%)' }} />
 : (
    
<img class="w-60 h-120 object-contain mb-4 shadow border border-black-600" src={`${selectedBook.coverImage}`}   alt="Book cover image" loading="lazy"/>)}
{selectedBook.buyLink &&(
<a href={`${selectedBook.buyLink}`}class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg inline-flex items-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-label="Shelved as 'Currently reading'. Tap to edit shelf for this book">
Buy on Google Play
</a>)}

</div>

  
<div class="col-8 ml-auto">
  <h1 class="text-3xl font-bold mb-2"></h1>

  
  <h1 class="text-3xl font-bold mb-4">{selectedBook.title}</h1>

  <p class="text-gray-700 mb-3"><span class="font-medium">Author:</span> {selectedBook?.author}</p>
  <p class="text-gray-700 mb-3"><span class="font-medium">Average rating:</span> {selectedBook.averageRating}</p>
  <p class="text-gray-700 mb-3"><span class="font-medium">Ratings:</span>{selectedBook.ratingsCount}</p>
  <p class="text-gray-700 mb-3"><span class="font-medium">Genres:</span> {selectedBook.genre}</p>
  <p class="text-gray-700 mb-3"><span class="font-medium">First Published:</span> {date}</p>
  
  {selectedBook.description &&(<><p class="text-gray-700 mb-3"><span class="font-medium">Description: </span>{selectedBook.description.replace(/(<([^>]+)>)/gi, '')}</p></>)}
  <div class="mb-4">
    <h3 class="text-lg font-medium mb-3">About the author</h3>
    <div class="flex mb-1">
    {bio ? (
        <div
          className={(
            '  bg-white border border-gray-300 rounded-lg shadow-lg p-4',
            { 'mt-2': !loading }
          )}
        >
          <p className="text-gray-800">{bio}</p>
        </div>
      ): (<p>{selectedBook.author}</p>)}

    </div>
  </div> 
  <div>
 
  {selectedBook.downloadLink != "" && (   <Link to={`/book/${id}/`} className="inline-block">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center mt-2 mb-2"
      >
        <span className="mr-2">Read Online</span>
        <FontAwesomeIcon icon={faBookOpen} />
      </button>
    </Link>

   )}
  
</div>

  <Reviewsection bookId={selectedBook._id}/>
  <Reviewscommunity bookId={selectedBook._id}/>
</div>


</div>)}

</div>

  )
}

export default Bookdetail