import axios from 'axios';
import { getDataAPI, postDataAPI } from '../../utils/fetchData';
export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  GET_POST: 'GET_POST',
  DELETE_POST: 'DELETE_POST',
  FILTER_POST: 'FILTER_POST'
}
export const addBookToShelf = ({name, user_id,book,auth}) =>async (dispatch) => {
    const data = {drawerName:name, userId:user_id,book} ;
  
    dispatch({ type: 'ADD_BOOK_TO_BOOKSHELF_REQUEST' });
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
    try {
    const response =  await postDataAPI(`bookshelf/books`, data, auth.token)
    console.log(response.data)
        dispatch({
          type: 'ADD_BOOK_TO_BOOKSHELF_SUCCESS',
          payload: response.data
        });
        const res = await getDataAPI('posts', auth.token)
        
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: {...res.data, page: 2}
        })
        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
      }catch(error) {
        const errorMessage = error.response.data.msg;
        dispatch({
          type: 'ADD_BOOK_TO_BOOKSHELF_FAILURE',
          payload: errorMessage
        });
        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
      };
    };
    
export const getbookshelf = (userId,auth) =>async (dispatch) => {

  dispatch({ type: 'FETCH_BOOKSHELVES_REQUEST' });
  try {
  const response =  await getDataAPI(`bookshelf/books/${userId}`, auth.token)
 
      dispatch({
        type: 'FETCH_BOOKSHELVES_SUCCESS',
        payload: response.data
      });
    }catch(error) {
  
      const errorMessage = error.response.data.msg;
      dispatch({
        type: 'FETCH_BOOKSHELVES_FAILURE',
        payload: errorMessage
      });
    };
  }
  export const updateDrawers = (state, newDrawer) => {
    // Tạo một bản sao mới của state
    const newState = { ...state };
    // Tạo một bản sao mới của mảng drawers
    const newDrawers = [...newState.drawers];
    // Thêm drawer mới vào mảng drawers
    newDrawers.push(newDrawer);
    // Cập nhật lại state
    newState.drawers = newDrawers;
    return newState;
  }
  