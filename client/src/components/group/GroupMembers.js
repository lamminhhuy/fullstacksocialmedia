import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function GroupMembers({members}) {
useEffect (()=> {
    console.log("members have changed:", members);
},[members])
  return (
    <div>
      <h2>Members</h2>
      
  <ul class=" ">
  {members && members.map((member) => (
       
      <Link to={`/profile/${member._id}`}>
    <li class="bg-white p-2 rounded-md shadow-md mt-2 mb-2" key={member._id}>
      <div class="flex items-center mb-2">
        <img src={`${member.avatar}`} alt="Friend avatar" class="w-10 h-10 rounded-full mr-2" />
        <div class="font-semibold text-lg">{member.fullname}</div>
      </div>
      <div class="text-gray-500">Online</div>
      </li>
      </Link>
      ))}
  </ul>
    
     
    </div>
  );
}

export default GroupMembers;
