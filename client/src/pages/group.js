import React, { useEffect, useRef, useState, useCallback } from 'react';
import { fetchGroup, joinGroup } from '../redux/reducers/groupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import PostForm from '../components/group/PostForm';
import GroupMembers from '../components/group/GroupMembers';
import { Spin } from 'antd';
import PostCard from '../components/PostCard';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
const isMemberOfGroup = (group, userId) => {
  return group?.members?.some(member => member._id === userId);
};

export  const Group = () => {
  const { id } = useParams();
  const { auth,theme,status } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const groupStatus = useSelector((state) => state.group.status);
  const group = useSelector((state) => state.group.group);
 
  const posts = useSelector((state) => state.group.posts);
  const isMember = isMemberOfGroup(group,  auth.user? auth.user._id: "");

  const postFormRef = useRef();

  const handleJoinGroup = useCallback(() => {
    dispatch(joinGroup({ groupId: id, auth }));
  }, [dispatch, id, auth]);

  useEffect(() => {
    
    dispatch(fetchGroup(id));
  }, [id, dispatch]);

  const handleModalClose = (event) => {
    if (postFormRef.current && event.target !== postFormRef.current && !postFormRef.current.contains(event.target)) {
      setModalIsOpen(false);
    }
  };
  
  const renderMembers = useCallback(() => {
    return <GroupMembers key={group?.members?.length} members={group?.members} />;
  }, [group]);
  return (
    <div onClick={handleModalClose} className='row w-full'>
      <div className='col-2'>
      <GroupMembers key={group?.members?.length} members={group?.members} />
      </div>
      <div className='col-10 '>
     
        <div className=" relative  ">
        
            <div ref={postFormRef} className=''>
            {status&&     <PostForm auth={auth} groupId={group._id} />}
            </div>
       
        </div>
        <div className="flex flex-col h-full">
          <div className="bg-white py-4 px-4 flex justify-between items-center">
            <h1 className="text-lg font-medium">Group Name: {group.name}</h1>
            <div className="flex items-center">
              {!isMember && groupStatus !== 'loading' && (
                <button onClick={handleJoinGroup} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Join Group
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <div className="flex items-center mb-4">
          <h2 className="text-lg font-medium mr-4">Posts</h2>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => dispatch({
              type: GLOBALTYPES.STATUS, payload: true
          })}>
          
            New Post
          </button>
        </div>
        {groupStatus === 'loading' ? (
          <div>Loading...</div>
        ) : groupStatus === 'failed' ? (
          <div>Failed to load group</div>
        ) : (
          <div class="flex flex-col">
        
           
            { posts&& posts.map((post) => (
             <div className="posts col-8  ">
            <PostCard post={post} theme={theme}/>
            </div>
            ))}
          
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  )};
