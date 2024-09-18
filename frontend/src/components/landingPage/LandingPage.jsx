import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postSelector, getAllPostAsync, likePostAsync } from "../../redux/reducers/postReducer";
import { followUserAsync, unfollowUserAsync, userSelector } from "../../redux/reducers/userReducer";
import "./landing.css"

export default function LandingPage() {
    const [followingStatus, setFollowingStatus] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const posts = useSelector(postSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await dispatch(getAllPostAsync({ page: currentPage, limit: postsPerPage }));
                if (response.payload.posts.length < postsPerPage) {
                    setHasMorePosts(false);
                } else {
                    setHasMorePosts(true);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchPosts();
    }, [dispatch, currentPage, postsPerPage]);

    useEffect(() => {
        const status = {};
        posts.forEach(post => {
            if (post.user && post.user.followers) {
                status[post._id]=post.user.followers.includes(user._id);
            } else {
                status[post._id]=false;
            }
        });
        setFollowingStatus(status);
    }, [posts, user]);

    const handleLike=(postId)=>{
        dispatch(likePostAsync(postId));
    };

    const handleFollow = (userId) => {
        if (followingStatus[userId]) {
            dispatch(unfollowUserAsync(userId));
        } else {
            dispatch(followUserAsync(userId));
        }
        setFollowingStatus(prev=>({...prev,[userId]: !prev[userId] }));
    };

    const handleNextPage=()=>{
        setCurrentPage(prevPage=>prevPage+1);
    };

    const handlePreviousPage=()=>{
        if (currentPage > 1) {
            setCurrentPage(prevPage=>prevPage-1);
        }
    };

    return (
        <div className="landing-page-container">
            <h1 className="landing-page-title">Home Page</h1>
            <ul className="post-list">
                {posts && posts.length > 0 ? (
                    posts.map((post, index) => (
                        <li key={index} className="post-item">
                            <div className="post-content">
                                <p>{post.text}</p>
                                <p className="post-author">by {post.user.name}</p>
                                <div className="post-actions">
                                    <button className="like-button" onClick={() => handleLike(post._id)}>Like</button>
                                    <span className="like-count">{post.likes.length} likes</span>
                                    <button className="follow-button" onClick={() => handleFollow(post.user._id)}>
                                        {followingStatus[post.user._id] ? 'Unfollow' : 'Follow'}
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="no-posts">No posts available</li>
                )}
            </ul>
            <div className="pagination-controls">
                <button 
                    className="pagination-button" 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="pagination-info">Page {currentPage}</span>
                <button 
                    className="pagination-button" 
                    onClick={handleNextPage}
                    disabled={!hasMorePosts}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
