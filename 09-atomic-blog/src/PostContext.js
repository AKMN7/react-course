import { createContext, useContext, useState } from "react";
import RandomPost from "./RandomPost";

const PostContext = createContext();

function PostProvider({ children }) {
    const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => RandomPost()));
    const [searchQuery, setSearchQuery] = useState("");

    const searchedPosts = searchQuery.length > 0 ? posts.filter((post) => `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())) : posts;

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    return (
        <PostContext.Provider
            value={{
                posts: searchedPosts,
                onAddPost: handleAddPost,
                onClearPosts: handleClearPosts,
                searchQuery,
                setSearchQuery
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

function usePosts() {
    const conext = useContext(PostContext);
    if (conext === undefined) throw new Error("Context Used Outside Provider");
    return conext;
}

export { PostProvider, usePosts };
