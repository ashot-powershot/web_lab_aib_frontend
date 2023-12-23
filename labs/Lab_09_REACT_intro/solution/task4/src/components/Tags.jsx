import React from "react";

const Tags = ({ allTags, selectedTags, handleTagClick, handleClearTags }) => {
  return (
    <div>
      {allTags.map((tag) => (
        <button
          key={tag}
          className={`btn p-2 m-2 bg-gradient shadow-sm ${
            selectedTags.includes(tag) ? "bg-warning" : "bg-primary-subtle"
          }`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      ))}
      {selectedTags.length > 0 && (
        <button
          className="btn p-2 m-2 bg-gradient shadow-sm btn-danger"
          onClick={handleClearTags}
        >
          Очистить теги
        </button>
      )}
    </div>
  );
};

export default Tags;
