import React, { useState, createContext } from "react";
import Users from "./users";
import Tags from "./Tags";

const PostContext = createContext();

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Александр Цой 🐺",
      text: "Где ВДВ ломает ноги, там ЖДВ кладет дороги!",
      img: "https://sun9-75.userapi.com/impg/PPMf46X-evqHOsSYXswl-Pk4xBxYe5zm4xxStQ/Ra2Nst5LQM8.jpg?size=402x604&quality=95&sign=a9ba1dba691bebb6fb988ea263128f42&c_uniq_tag=889UQnEVM8KeIAM-EOUH2HLXR-SAdsCedzTHj9BCxD4&type=album",
      tags: "музыка отдых",
      liked: false,
    },
    {
      id: 2,
      name: "Яна Смирнова 🐱",
      text: "Не успеваю успевать 🤷‍♀️",
      img: "https://sun9-77.userapi.com/impg/5tAxLrTk_xkFCqU_J7z5HnhI8CIcYHmYeDoM7Q/rgdbqjebaiA.jpg?size=320x481&quality=95&sign=41370835dfe9a87382e2017c5c403297&c_uniq_tag=dgKwYW2OAmdUCGJMYOrizoZtnFYVfD-Gf6r9mOsALgE&type=album",
      tags: "отдых",
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
      img: "https://sun9-26.userapi.com/impg/lwVJukPHKAi4GJdFeQlCp_VHzVI-rB6OMB4kgg/KJyKIPLAMpk.jpg?size=873x1080&quality=96&sign=f535e49a47244cff8f0bbb0f09322cc0&type=album",
      tags: "музыка",
      liked: false,
    },
  ]);

  // Нажитие на кнопку Лайка для поста
  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  // Состояние для создания нового поста с пустыми значениями
  const [newPost, setNewPost] = useState({
    id: null,
    name: "",
    text: "",
    img: "",
    tags: "",
    liked: false,
  });

  // Добавление нового поста если есть 'имя и текст' или 'имя и картинка'
  const handleAddPost = () => {
    if ((newPost.name && newPost.text) || (newPost.name && newPost.img)) {
      setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
      setNewPost({
        id: null,
        name: "",
        text: "",
        img: "",
        tags: "",
        liked: false,
      });
    }
  };

  // Удаление поста по кнопке
  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Получаем уникальный список всех тегов из всех постов
  const allTags = [
    ...new Set(
      posts
        // Разделение строки тегов на отдельные теги с помощью разделителя ','
        .map((post) => post.tags.split(/[ ,]+/))
        // Получаем одномерный массив тегов
        .flat()
        // Убираем пробелы перед и после каждого тега
        .map((tag) => tag.trim())
        // Удалить пустые теги, если есть
        .filter((tag) => tag !== "")
        // Добавить "#" перед каждым тегом и привести все теги к нижнему регистру
        .map((tag) => "#" + tag.toLowerCase())
    ),
  ];

  // Создайте состояние для хранения выбранных тегов
  const [selectedTags, setSelectedTags] = useState([]);

  // Функция для обработки клика по тегу
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <>
      <PostContext.Provider value={allTags}>
        <div
          className="container"
          style={{ minWidth: "420px", maxWidth: "500px" }}
        >
          
          {/* Создание нового поста */}
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
              <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                  Тег
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  value={newPost.tags}
                  onChange={(e) =>
                    setNewPost({ ...newPost, tags: e.target.value })
                  }
                />
              </div>
              <button
                className="btn btn-primary bg-gradient"
                onClick={handleAddPost}
              >
                Добавить пост
              </button>
            </div>
          </div>
          
          {/* Заголовок отображения есть ли Новости */}
          <h1>
            <span
              className={
                "badge mt-5 mb-3 shadow  bg-gradient bg-" +
                (posts.length > 0 ? "primary" : "danger")
              }
            >
              {posts.length > 0 ? "Новости" : "Новостей нет"}
            </span>
          </h1>

          {/* Вывод всех уникальных тегов со всех постов */}
          <Tags
            allTags={allTags}
            selectedTags={selectedTags}
            handleTagClick={handleTagClick}
            handleClearTags={() => setSelectedTags([])}
          />

          {/* Отображение всех постов */}
          <Users
            posts={posts.filter(
              (post) =>
                selectedTags.length === 0 ||
                selectedTags.every((tag) =>
                  post.tags.toLowerCase().split(/[ ,]+/).includes(tag.substr(1))
                )
            )}
            handleLike={handleLike}
            handleDeletePost={handleDeletePost}
          />
        </div>
      </PostContext.Provider>
    </>
  );
};

export default App;
