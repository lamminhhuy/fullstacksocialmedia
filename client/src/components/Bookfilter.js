import { useState } from "react";

import { useDispatch } from "react-redux";
import { Radio } from 'antd';
import { filterReadableBooks, searchBooks } from "../redux/reducers/booksSlice";

const BookFilter= ({keyword}) =>{
  const [filter, setFilter] = useState("all");
const dispatch = useDispatch();
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(event.target.value);
    if (value=="all")
    {
dispatch(searchBooks(keyword))
    }
    dispatch(filterReadableBooks(value));
  
  };
  return (
    <div>
      <Radio.Group onChange={handleFilterChange} value={filter}>
        <Radio value={"all"}>All</Radio>
        <Radio value={"readable"}>Readable</Radio>
        <Radio value={"Best selling"}>Best Selling</Radio>
      </Radio.Group>
    </div>
  );
}

export default BookFilter;
