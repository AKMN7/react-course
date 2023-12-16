import { useState } from "react";
import { PostProvider, usePosts } from "./PostContext";
import RandomPost from "./RandomPost";
import Test from "./Test";

function App() {
    return (
        <PostProvider>
            <section>
                <Header />
                <Main />
                <Archive />
                <Footer />
            </section>
        </PostProvider>
    );
}

function Header() {
    const { onClearPosts } = usePosts();

    return (
        <header>
            <h1>
                <span>⚛️</span>The Atomic Blog
            </h1>
            <div>
                <Results />
                <SearchPosts />
                <button onClick={onClearPosts}>Clear posts</button>
            </div>
        </header>
    );
}

function SearchPosts() {
    const { searchQuery, setSearchQuery } = usePosts();
    return <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search posts..." />;
}

function Results() {
    const { posts } = usePosts();
    return <p>🚀 {posts.length} atomic posts found</p>;
}

function Main() {
    return (
        <main>
            <FormAddPost />
            <Posts />
        </main>
    );
}

function Posts() {
    return (
        <section>
            <List />
        </section>
    );
}

function FormAddPost() {
    const { onAddPost } = usePosts();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = function (e) {
        e.preventDefault();
        if (!body || !title) return;
        onAddPost({ title, body });
        setTitle("");
        setBody("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Post body" />
            <button>Add post</button>
        </form>
    );
}

function List() {
    const { posts } = usePosts();

    return (
        <>
            <ul>
                {posts.map((post, i) => (
                    <li key={i}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
            <Test />
        </>
    );
}

function Archive() {
    const { onAddPost } = usePosts();

    const [posts] = useState(() => Array.from({ length: 10000 }, () => RandomPost()));
    const [showArchive, setShowArchive] = useState(false);

    return (
        <aside>
            <h2>Post archive</h2>
            <button onClick={() => setShowArchive((s) => !s)}>{showArchive ? "Hide archive posts" : "Show archive posts"}</button>

            {showArchive && (
                <ul>
                    {posts.map((post, i) => (
                        <li key={i}>
                            <p>
                                <strong>{post.title}:</strong> {post.body}
                            </p>
                            <button onClick={() => onAddPost(post)}>Add as new post</button>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
}

function Footer() {
    return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
