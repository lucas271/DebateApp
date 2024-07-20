package post_handlers

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/lucas271/DebateApp/api/middleware"
	"github.com/lucas271/DebateApp/internal/database"
)

type Post struct {
	Data       database.Post
	StatusCode int
}

type Posts struct {
	Data       []database.Post
	StatusCode int
}

// needs further error handler.
func (post Post) NewPost(r *http.Request, apiCfg middleware.ApiConfig) (postresp Post, err []error) {

	PostParams := database.CreatePostParams{}

	jsonDecoderErr := json.NewDecoder(r.Body).Decode(&PostParams)

	if jsonDecoderErr != nil {
		return Post{Data: database.Post{}, StatusCode: 400}, []error{errors.New("invalid request, missing fields")}
	}

	createPostQuery, queryErr := apiCfg.DB.CreatePost(r.Context(), PostParams)

	if queryErr != nil {
		return Post{Data: database.Post{}, StatusCode: 500}, []error{errors.New("error creating post")}
	}

	return Post{
		Data:       createPostQuery,
		StatusCode: 200,
	}, nil
}

//next thing is to add limiters and offsets.

func (posts Posts) GetPosts(r *http.Request, apiCfg middleware.ApiConfig) (postsResp Posts, err []error) {
	GetPostsQuery, queryErr := apiCfg.DB.GetAllPosts(r.Context())

	if queryErr != nil {
		return Posts{Data: []database.Post{}, StatusCode: 500}, []error{errors.New("error fetching Posts")}
	}

	return Posts{
		Data:       GetPostsQuery,
		StatusCode: 200,
	}, nil
}
