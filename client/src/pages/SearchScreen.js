import React, { useEffect } from 'react'
import { BookSection } from '../components/BookSection'
import { useParams } from 'react-router-dom';

export const SearchScreen = () => {
  const { keyword } = useParams();
useEffect(()=> {
console.log(keyword)
})
  return (
    <>
      <BookSection keyword={keyword} />
    </>
  )
}
