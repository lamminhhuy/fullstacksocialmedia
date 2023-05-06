import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getbookshelf } from '../../redux/actions/bookshelfAction';
import Rating from '../bookresults/rating';
import { Drawers } from './Drawer';

import {AddBookListModal} from './AddBookListModal';
const BookshelfSection = ({user,id,bookshelf, profile}) => {
  const dispatch = useDispatch()
  const { drawers,loading,error} = useSelector (state => state.bookshelf)
  
  const { auth} = useSelector (state => state)
  const [visible, setVisible] = useState(false);
  const [bookLists, setBookLists] = useState([]);

  const handleCreate = (bookListName) => {
    setBookLists([...bookLists, bookListName]);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
  
    <div class="my-4 flex flex-col justify-center  h-full">
   <AddBookListModal visible={visible} onCreate={handleCreate} onCancel={handleCancel} auth={auth}/>
    <div className='flex justify-center'>
      <h2 class="text-lg font-medium mb-2">{profile.users[0]?.fullname.toUpperCase()}'s Bookshelves</h2>
    </div>
   

        <div class="flex flex-col space-y-4  bg-white rounded-lg shadow-md hover:shadow-lg p-4  h-full">
        <button class="bg-brown w-64  text-white font-semibold py-2 px-4 rounded shadow hover:bg-brown focus:outline-none focus:shadow-outline"  onClick={() => setVisible(true)}>
  Add a book list
</button>

    <div class="">
   
        
            {drawers?.map((drawer) => ( 
              <> <span className="text-xl font-medium ">{drawer.name && drawer.name === "Read" ? "Finished reading" : drawer.name}</span>
              <Drawers drawer={drawer}/>
              <hr className="mb-2 mt-1"></hr></>) )}
       
{drawers&& drawers.length ==0  &&( <span>{user && user.fullname} doesn't have any book yet </span>)}
    </div>   </div>  
  
</div>

  )
}

export default BookshelfSection