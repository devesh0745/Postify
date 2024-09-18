import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    posts:[]
}

export const createPostAsync=createAsyncThunk(
    'post/createPost',
    async(payload,{rejectWithValue})=>{
        try{
            //console.log('create post:',payload);
            const token=localStorage.getItem('token')
            //console.log(token)
            if (!token) {
                return rejectWithValue('No token found, please log in.');
            }
            return await axios.post('http://localhost:8000/api/post/createPost',payload,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                    "Content-Type":'application/json',   
                }
            })
        }catch(error){
            console.log('Error in creating post:',error)
            return rejectWithValue(error.response.data);
        }
    }
)
export const getAllPostAsync = createAsyncThunk(
    'post/getAllPost',
    async({ page, limit }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found, please log in.');
            }
            const resp = await axios.get(`http://localhost:8000/api/post/getAllPost?page=${page}&limit=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": 'application/json',
                }
            });
            return resp.data; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const likePostAsync = createAsyncThunk(
    'post/likePost',
    async (postId,{rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found, please log in.');
            }
            const response = await axios.post(
                'http://localhost:8000/api/like/likePost',
                {postId},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": 'application/json',
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.log('Error in liking post:', error);
            return rejectWithValue(error.response.data);
        }
    }
);


const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createPostAsync.fulfilled,(state,action)=>{
            state.posts=[action.payload.data.post, ...state.posts];
        })
        .addCase(createPostAsync.rejected,(state,action)=>{
            console.log('Error in creating post:',action.payload)
        })
        .addCase(getAllPostAsync.fulfilled,(state,action)=>{
          //  console.log('all post:',action.payload)
            state.posts = action.payload.posts;
        })
        .addCase(getAllPostAsync.rejected,(state,action)=>{
            console.log('stata get post:',state.posts)
            console.log('Error in getting post:',action);
        })
        .addCase(likePostAsync.fulfilled, (state, action) => {
            const postIndex = state.posts.findIndex(post => post._id === action.payload.like.post);
            if (postIndex !== -1) {
                state.posts[postIndex].likes.push(action.payload.like._id);
            }
        })
        .addCase(likePostAsync.rejected, (state,action) => {
            console.log('Error in liking post:', action.payload);
        });
    }
    
});

export const postReducer=postSlice.reducer;
export const postSelector=(state)=>state.postReducer.posts;