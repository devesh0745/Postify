import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
};

export const signUpAsync = createAsyncThunk(
  "user/signUpUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post('http://localhost:8000/api/user/sign-up', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log('Error in sign-up', error);
      return rejectWithValue(error.response.data); 
    }
  }
);

export const signInAsync = createAsyncThunk(
  "user/signInUser",
  async (payload, {rejectWithValue}) => {
    try {
      const resp = await axios.post('http://localhost:8000/api/user/sign-in', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return resp.data; 
    } catch (error) {
      console.log('Error in sign-in', error);
      return rejectWithValue(error.response.data); 
    }
  }
);

export const followUserAsync = createAsyncThunk(
  'user/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      console.log('USERID:',userId);
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found, please log in.');
      }
      const response = await axios.post('http://localhost:8000/api/user/follow-user', { userId }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.log('Error in following user', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUserAsync = createAsyncThunk(
  'user/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found, please log in.');
      }
      const response = await axios.post('http://localhost:8000/api/user/unfollow-user', {userId}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.log('Error in unfollowing user', error);
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(signInAsync.rejected, (state, action) => {
        console.log('Error in signing in!!', action.payload);
      })
      .addCase(followUserAsync.fulfilled, (state, action) => {
        if (state.user) {
          state.user.following.push(action.payload.userId);
        }
      })
      .addCase(unfollowUserAsync.fulfilled, (state, action) => {
        if (state.user) {
          state.user.following = state.user.following.filter(id => id !== action.payload.userId); 
        }
      })
      .addCase(followUserAsync.rejected, (state, action) => {
        console.log('Error in following user', action.payload);
      })
      .addCase(unfollowUserAsync.rejected, (state, action) => {
        console.log('Error in unfollowing user', action.payload);
      });
  }
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelector = (state) => state.userReducer.user;
export const tokenSelector = (state) => state.userReducer.token;
