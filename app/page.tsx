"use client";

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, increment } from '@/slices/userSlice';
import { AppDispatch, RootState } from '@/store/store';



export default function Home() {

  const userRef = useRef(false);

  const { entities, loading, value } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  console.log('loading', loading)
  // console.log(entities);

  useEffect(() =>{
    if(userRef.current === false){
      dispatch(fetchUsers());
    }
    return () =>{
      userRef.current = true;
    }
  }, [])

  return (
    <div className=''>
      {loading? (
        <h1>Loading...</h1>
      ) : (
        entities?.map((user: any) => <h3 key={user.id}>{user.name}</h3> )
      )}

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>
      {value}
    </div>
  )
}
