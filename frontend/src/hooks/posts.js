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
        massage: action.payload.message,
        posts: action.payload.data,
        loading: false,
      };
    // case "DELETE_POST":
    //     return {
    //         ...state,
    //         massage: action.payload.message,
    //         posts: state.posts.filter(
    //         (post) => post._id !== action.payload.data._id
    //         ),
    //         loading: false,
    //     };
    case "ADD_POST":
      return {
        ...state,
        message: action.payload.message,
        posts: [...state.posts, action.payload.data],
      };
    // case "UPDATE_POST":
    //     return {
    //         ...state,
    //         message: action.payload.message,
    //         post: action.payload.data,
    //         posts: state.posts.map((p) =>
    //         p._id === action.payload.data._id ? action.payload.data : p
    //         ),
    //     };
    // case "UPDATE_PICTURE":
    //     return {
    //         ...state,
    //         message: action.payload.message,
    //         post: action.payload.data,
    //         posts: state.posts.map((p) =>
    //         p._id === action.payload.data._id ? action.payload.data : p
    //         ),
    // };
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
    log: console.log("Log usePosts : ", {
      state,
      posts: state.posts,
      post: state.post,
      loading: state.loading,
      message: state.message,
    }),
    posts: state.posts, // array of posts
    post: state.post, // single post
    fetchPosts: async () => {
      try {
        if (state.loading || state.members) return; // Don't fetch if already loading or if already fetched

        dispatch({ type: "FETCHING_POSTS" }); // Set loading to true
        const posts = await apiFetch("/api/post"); // Fetch all users from API
        dispatch({ type: "SET_POSTS", payload: posts }); // Set members and loading to false
      } catch (err) {
        console.error(err);
      }
    },
    addPost: async (data) => {
      try {
        const newPost = await apiFetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        dispatch({ type: "ADD_POST", payload: newPost });
      } catch (err) {
        console.error(err);
      }
    },
  };
}
