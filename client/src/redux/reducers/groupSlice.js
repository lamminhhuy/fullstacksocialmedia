import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataAPI, postDataAPI } from '../../utils/fetchData';
import axios from 'axios';

const initialState = {
  groups: [],
  group: null,
  posts: [],
  status: 'idle',
  error: null
};

export const fetchGroupsAsync = createAsyncThunk(
  'groups/fetchGroups',
  async () => {
    const response = await getDataAPI('groups');
    return response.data;
  }
);
export const fetchGroup = createAsyncThunk('group/fetchGroup', async (groupId) => {

  const response = await axios.get(`/api/groups/${groupId}`);
  return response.data;
});
export const fetchPosts = createAsyncThunk('group/fetchPosts', async (groupId,auth) => {
  console.log(groupId)
  const response = await getDataAPI(`group/posts/`,auth.token);
  return response.data;
});
export const searchGroups = createAsyncThunk('groups/searchGroups', async (query) => {
  const response = await axios.get(`/api/groups/search?query=${query}`);
  return response.data;
});
export const joinGroup = createAsyncThunk(
  'groups/join',
  async ({groupId,auth}) => {
    const response = await postDataAPI(`groups/join/${groupId}`,{},auth.token);
    return response.data;
  }
);
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postAdded: (state, action) => {
      return {
      ...state,
      posts:[...state.posts,action.payload]
      }
   } },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGroupsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(fetchGroupsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchGroup.pending, (state) => {
        state.status = 'loading';
      })
      // Khi API request trả về thành công
      .addCase(fetchGroup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.group = action.payload.group;
        state.posts = action.payload.posts;
      })
      .addCase(searchGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload;  
      })
      .addCase(searchGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Khi API request trả về thất bại
      .addCase(fetchGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(joinGroup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(joinGroup.fulfilled, (state,action) => {
        state.status = 'succeeded';
        state.group.members.push(action.payload)
      })
      .addCase(joinGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { postAdded } = postSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;

export default postSlice.reducer;
