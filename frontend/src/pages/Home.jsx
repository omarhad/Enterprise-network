import React, { useEffect, useState } from "react";
import Card from "../components/posts/Card";
import NewPost from "../components/posts/NewPost";

export default function Home({ posts, getPosts, profil, isAdmin, addPost }) {
  const [loadPost, setLoadPost] = useState(true);

  useEffect(() => {
    if (loadPost || !posts) {
      getPosts();
      setLoadPost(false);
    }
  }, [loadPost, getPosts, posts]);

  return (
    <>
      <NewPost profil={profil} addPost={addPost} />
      <ul className="posts">
        {posts &&
          posts.map((post) => (
            <Card
              post={post}
              key={post._id}
              profil={profil}
              isAdmin={isAdmin}
            />
          ))}
      </ul>
    </>
  );
}
