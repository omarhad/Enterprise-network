import { useReducer } from "react";
import { apiFetch } from "../utils/Api";

function reducer(state, action) {
  console.log({
    REDUCER: "POSTS_REDUCER",
    state: state,
    type: action.type,
    action: action,
  });
  switch (action.type) {
    case "FETCHING_POSTS":
      return { ...state, loading: true };
    case "SET_POSTS":
      return {
        ...state,
        message: action.payload.message,
        posts: action.payload,
        loading: false,
      };
    case "ADD_POST":
      return {
        ...state,
        message: action.payload.message,
        posts: [action.payload.data, ...state.posts],
        loading: false,
      };
    case "DELETE_POST":
      return {
        ...state,
        message: action.payload.message,
        posts: state.posts.filter(
          (post) => post._id !== action.payload.data._id
        ),
        loading: false,
      };
    case "UPLOAD_POST":
      return {
        ...state,
        message: action.payload.message,
        posts: state.posts.map((p) =>
          p._id === action.payload.data._id ? action.payload.data : p
        ),
        loading: false,
      };
    case "DELETE_UPLOAD_POST":
      return {
        ...state,
        message: action.payload.message,
        posts: state.posts.map((p) =>
          p._id === action.payload.data._id ? action.payload.data : p
        ),
        loading: false,
      };
    case "LIKE_POST":
      return {
        ...state,
        message: action.payload.message,
        posts: state.posts.map((p) =>
          p._id === action.payload.data._id ? action.payload.data : p
        ),
        loading: false,
      };
    case "UPDATE_POST":
      return {
        ...state,
        message: action.payload.message,
        posts: state.posts.map((p) =>
          p._id === action.payload.data._id ? action.payload.data : p
        ),
        loading: false,
      };
    case "COMMENT_POST":
      return {
        ...state,
        message: action.payload.message,
        posts: state.posts.map((p) =>
          p._id === action.payload.data._id ? action.payload.data : p
        ),
        loading: false,
      };
    case "COMMENT_DELETE":
      return {
        ...state,
        message: action.payload.message,
        posts: state.posts.map((p) =>
          p._id === action.payload.data._id ? action.payload.data : p
        ),
        loading: false,
      };
    case "COMMENT_UPDATE":
      return {
        ...state,
        message: action.payload.message,
        posts: state.posts.map((p) =>
          p._id === action.payload.data._id ? action.payload.data : p
        ),
        loading: false,
      };
    default:
      throw new Error("Unknown action " + action.type);
  }
}
export function usePosts() {
  const [state, dispatch] = useReducer(reducer, {
    posts: null,
    post: null,
    loading: false,
  });
  return {
    posts: state.posts, // array of posts
    post: state.post, // single post
    loading: state.loading, // boolean
    message: state.message, // string
    fetchPosts: async (num) => {
      try {
        if (state.loading || state.posts) return; // Don't fetch if already loading or if already fetched

        dispatch({ type: "FETCHING_POSTS" }); // Set loading to true
        const posts = await apiFetch("/api/post"); // Fetch all users from API
        dispatch({ type: "SET_POSTS", payload: posts.data }); // Set members and loading to false
      } catch (err) {
        console.error(err);
      }
    },
    addPost: async (data) => {
      try {
        const newPost = await apiFetch("/api/post", {
          method: "POST",
          body: data,
        });
        dispatch({ type: "ADD_POST", payload: newPost });
      } catch (err) {
        console.error(err);
      }
    },
    deletePost: async (id, isAdmin, posterId) => {
      try {
        const data = { isAdmin: isAdmin, posterId: posterId };
        console.log("data", data);
        return await apiFetch("/api/post/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }) // Delete post from API
          .then((res) => {
            dispatch({ type: "DELETE_POST", payload: res }); // Delete member from state
          });
      } catch (err) {
        console.error(err);
      }
    },
    uploadPicPost: async (id, data) => {
      try {
        const newPost = await apiFetch("/api/post/upload/" + id, {
          method: "POST",
          body: data,
        });
        dispatch({ type: "UPLOAD_POST", payload: newPost });
      } catch (err) {
        console.error(err);
      }
    },
    deletePicPost: async (id, data) => {
      try {
        const newPost = await apiFetch("/api/post/delete-upload/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        dispatch({ type: "DELETE_UPLOAD_POST", payload: newPost });
      } catch (err) {
        console.error(err);
      }
    },
    likePost: async (id, data) => {
      try {
        const newPost = await apiFetch("/api/post/like-post/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        dispatch({ type: "LIKE_POST", payload: newPost });
      } catch (err) {
        console.error(err);
      }
    },
    updatePost: async (id, data) => {
      try {
        const newPost = await apiFetch("/api/post/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        dispatch({ type: "UPDATE_POST", payload: newPost });
      } catch (err) {
        console.error(err);
      }
    },
    addComment: async (id, data) => {
      try {
        const newPost = await apiFetch("/api/post/comment-post/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        dispatch({ type: "COMMENT_POST", payload: newPost });
      } catch (err) {
        console.log(err);
      }
    },
    commentDelete: async (id, data) => {
      try {
        const newPost = await apiFetch("/api/post/delete-comment-post/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        dispatch({ type: "COMMENT_DELETE", payload: newPost });
      } catch (err) {
        console.error(err);
      }
    },
    commentUpdate: async (id, data) => {
      try {
        const newPost = await apiFetch("/api/post/edit-comment-post/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        dispatch({ type: "COMMENT_UPDATE", payload: newPost });
      } catch (err) {
        console.error(err);
      }
    },
  };
}
