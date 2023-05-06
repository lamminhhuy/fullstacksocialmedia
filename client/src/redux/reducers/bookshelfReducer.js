import { updateDrawers } from "../actions/bookshelfAction";

// Define initial state
const initialState = {
  drawers: [],
  loading: false,
  error: null,
};

// Define reducer function
const bookshelfReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKSHELVES_REQUEST':
      return { ...state, loading: true };
      
    case 'FETCH_BOOKSHELVES_SUCCESS':
      return { ...state, drawers: action.payload, loading: false };
    case 'FETCH_BOOKSHELVES_FAILURE':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_BOOK_TO_BOOKSHELF_REQUEST':
      return { ...state, loading: true };
      case 'ADD_DRAWER':
  return updateDrawers(state, action.payload);

    case 'ADD_BOOK_TO_BOOKSHELF_SUCCESS':
      return {
        ...state,
        bookshelves: action.payload,
        loading: false,
        error:[]
      };
    case 'ADD_BOOK_TO_BOOKSHELF_FAILURE':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default bookshelfReducer;
