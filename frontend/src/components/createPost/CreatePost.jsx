import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPostAsync } from "../../redux/reducers/postReducer";
import { userSelector } from "../../redux/reducers/userReducer";
import LandingPage from "../landingPage/LandingPage";
import './createPost.css'

export default function CreatePost() {
    const [input, setInput] = useState("");
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const handlePostSubmit = (e) => {
        e.preventDefault(); 
        const post = { text: input, user: user._id }; 
        dispatch(createPostAsync(post)); 
        setInput("");
    }

    return (
        <div className="create-post-container">
            <form onSubmit={handlePostSubmit} className="post-form">
                <textarea 
                    placeholder="What's on your mind?" 
                    onChange={(e) => setInput(e.target.value)} 
                    value={input} 
                    name="post"
                    className="post-input"
                ></textarea>
                <button type="submit" className="post-submit-btn">Add Post</button>
            </form>
            <div className="landing-page-section">
                <LandingPage />
            </div>
        </div>
    );
}
