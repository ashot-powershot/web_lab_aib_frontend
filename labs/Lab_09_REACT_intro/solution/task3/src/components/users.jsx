import React, { useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Коцулевский Игорь 🐺",
      text: "Что за тигр этот лев!",
      img: "https://sun9-73.userapi.com/impg/BbHNryQJpdTQcvIwNU4HqZynQ9rE8EQtVoXEeA/NU6fbXxa8YI.jpg?size=680x453&quality=96&sign=6d09a076046671b45dc23fb1d5626ef4&type=album",
      liked: false,
    },
    {
      id: 2,
      name: "Анастасия Царева 🐱",
      text: "Не успеваю успевать 🤷‍♀️",
      img: "https://sun9-13.userapi.com/impg/9zy-jYg3imTM-_2Os9fwgQ3DtBmPIe-A3zXKrg/6Wzk1I0174I.jpg?size=535x713&quality=96&sign=786c4139f126d8eb9966447db34968cf&type=album",
      liked: false,
    },
    {
      id: 3,
      name: "Виктор Цой 🎸🔥",
      text: "Группа крови – на рукаве,\
      \nМой порядковый номер – на рукаве,\
      \nПожелай мне удачи в бою,\
      \nПожелай мне:\
      \nНе остаться в этой траве,\
      \nНе остаться в этой траве.\
      \nПожелай мне удачи,\
      \nПожелай мне удачи!",
      img: "https://um.mos.ru/upload/iblock/f6d/07f3e68060d7.jpg",
      liked: false,
    },
  ]);

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const [newPost, setNewPost] = useState({
    id: null,
    name: "",
    text: "",
    img: "",
    liked: false,
  });

  const handleAddPost = () => {
    if (newPost.name && newPost.text) {
      const updatedPosts = [...posts, { ...newPost, id: posts.length + 1 }];
      setPosts(updatedPosts);
      setNewPost({
        id: null,
        name: "",
        text: "",
        img: "",
        liked: false,
      });
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <>
      <div
        className="container"
        style={{ minWidth: "420px", maxWidth: "500px" }}
      >
        <div className="card mb-3 bg-light shadow">
          <div className="card-body">
            <h3 className="card-title mb-3">Новый пост</h3>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Имя
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={newPost.name}
                onChange={(e) =>
                  setNewPost({ ...newPost, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Текст
              </label>
              <textarea
                className="form-control"
                id="text"
                value={newPost.text}
                onChange={(e) =>
                  setNewPost({ ...newPost, text: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="img" className="form-label">
                Изображение (cсылка на фото)
              </label>
              <input
                type="text"
                className="form-control"
                id="img"
                value={newPost.img}
                onChange={(e) =>
                  setNewPost({ ...newPost, img: e.target.value })
                }
              />
            </div>
            <button className="btn btn-primary" onClick={handleAddPost}>
              Добавить пост
            </button>
          </div>
        </div>
        <h1>
          <span
            className={
              "badge mt-5 mb-3 shadow bg-" +
              (posts.length > 0 ? "primary" : "danger")
            }
          >
            {posts.length > 0 ? "Новости" : "Новостей нет"}
          </span>
        </h1>
        {posts.map((post) => (
          <div key={post.id} className="card mb-3 bg-light shadow">
            <div className="card-body">
              <h3 className="card-title mb-3">{post.name}</h3>
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
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-x-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;