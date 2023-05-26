import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Spin,Button,Modal ,List,Input} from 'antd';
import { addDiscussion, fetchDiscussions } from '../../redux/reducers/groupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
const { Title } = Typography;

const DisscussionSection = ({groupId,auth}) => {
 
    const dispatch = useDispatch();
    const group = useSelector(state=>state.group)
  const [modalVisible, setModalVisible] = useState(false);
  const [discussionTopic, setDiscussionTopic] = useState('');

    
    const handleCreateClick = () => {
        setModalVisible(true);
      };
    
      const handleTopicChange = (e) => {
        setDiscussionTopic(e.target.value);
      };
    
      const handleCancel = () => {
        setModalVisible(false);
        setDiscussionTopic('');
      };
    
      const handleSave = () => {
        dispatch(addDiscussion({groupId,title: discussionTopic}))
        setModalVisible(false);
        setDiscussionTopic('');
      };
       useEffect(() => {
    dispatch(fetchDiscussions(groupId));
  }, [dispatch, groupId ]);
  return (
    <div>  
  <Modal
    title="Nhập chủ đề thảo luận"
    visible={modalVisible}
    onOk={handleSave}
    onCancel={handleCancel}
  >
    <Input
      placeholder="Nhập chủ đề thảo luận"
      value={discussionTopic}
      onChange={handleTopicChange}
    />
  </Modal>
 
  <div className="flex items-center justify-center  mb-4 ">
    

</div>
<Button type="" onClick={handleCreateClick} className='bg-purple hover:bg-faint-purple text-white mb-2 font-semibold'>
       Create a discussion
        </Button>
       
        <List
  dataSource={group.discussions}
  renderItem={(item) => (
    <>
      <List.Item className='w-full' >
        <Link to={`/group/${groupId}/discussion/${item._id}`}  className='w-full'>
          <div className="cursor-pointer hover:text-blue-500 border py-3 px-3  w-full rounded ">
            <div className="text-lg font-bold ">{item.title}</div>
          
          </div>
        </Link>
      </List.Item>
    </>

  )}
/>
</div>



  )
}

export default DisscussionSection