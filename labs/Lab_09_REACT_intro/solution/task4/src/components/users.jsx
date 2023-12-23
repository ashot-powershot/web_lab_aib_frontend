import React from "react";

const Users = ({ posts, handleLike, handleDeletePost }) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="card mb-3 bg-light shadow">
          <div className="card-body">
            <h3 className="card-title mb-3">
              {post.name}{" "}
              {post.tags && `#${post.tags.split(/[ ,]+/).join(" #")}`}
            </h3>
            {post.img && (
              <img
                src={post.img}
                className="card-img mb-2 shadow"
                style={{ width: "360px", height: "auto" }}
                alt="image"
              />
            )}
            <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
              {post.text}
            </p>
            <button
              className={
                "btn rounded-pill btn-" +
                (post.liked ? "danger " : "outline-primary")
              }
              onClick={() => handleLike(post.id)}
            >
              {post.liked ? (
                <i class="bi bi-suit-heart-fill"></i>
              ) : (
                <i class="bi bi-suit-heart"></i>
              )}
            </button>
            <button
              className="btn btn-outline-danger mx-5 rounded-pill position-relative"
              onClick={() => handleDeletePost(post.id)}
            >
              <i class="bi bi-person-x-fill"></i>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Users;
