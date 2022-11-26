import { useReducer } from "react";
import { apiFetch } from "../utils/Api";

function reducer(state, action) {
  console.log({
    REDUCER: "MEMBERS_REDUCER",
    state: state,
    type: action.type,
    action: action,
  });
  switch (action.type) {
    case "FETCHING_MEMBERS":
      return { ...state, loading: true };
    case "SET_MEMBERS":
      return {
        ...state,
        message: action.payload.message,
        members: action.payload.data,
        loading: false,
      };
    case "SET_PROFIL":
      return {
        ...state,
        message: action.payload.message,
        profil: action.payload.data,
        loading: false,
      };
    case "DELETE_MEMBER":
      return {
        ...state,
        message: action.payload.message,
        members: state.members.filter(
          (member) => member._id !== action.payload.data._id
        ),
        loading: false,
      };
    case "ADD_MEMBER":
      return {
        ...state,
        message: action.payload.message,
        members: [...state.members, action.payload.data],
      };
    case "UPDATE_MEMBER":
      return {
        ...state,
        message: action.payload.message,
        profil: action.payload.data,
        members: state.members.map((m) =>
          m._id === action.payload.data._id ? action.payload.data : m
        ),
        loading: false,
      };
    case "UPDATE_PICTURE":
      return {
        ...state,
        message: action.payload.message,
        profil: action.payload.data,
        members: state.members.map((m) =>
          m._id === action.payload.data._id ? action.payload.data : m
        ),
        loading: false,
      };

    default:
      throw new Error("Unknown action " + action.type);
  }
}

export function useMembers() {
  const [state, dispatch] = useReducer(reducer, {
    members: null,
    profil: null,
    loading: false,
  });

  return {
    members: state.members, // array of members
    profil: state.profil, // single member
    loading: state.loading, // boolean
    message: state.message, // message from server
    fetchMembers: async function () {
      try {
        if (state.loading || state.members) return; // Don't fetch if already loading or if already fetched

        dispatch({ type: "FETCHING_MEMBERS" }); // Set loading to true
        const members = await apiFetch("/api/user"); // Fetch all users from API
        dispatch({ type: "SET_MEMBERS", payload: members }); // Set members and loading to false
      } catch (err) {
        console.error(err);
      }
    },
    fetchMember: async function (id) {
      try {
        const profil = await apiFetch(`/api/user/${id}`); // Fetch single user from API
        dispatch({ type: "SET_PROFIL", payload: profil });
      } catch (err) {
        console.error(err);
      }
    },
    deleteMember: async function (member) {
      try {
        return await apiFetch("/api/user/" + member._id, { method: "DELETE" }) // Delete user from API
          .then((res) => {
            dispatch({ type: "DELETE_MEMBER", payload: res }); // Delete member from state
          });
      } catch (err) {
        console.error(err);
      }
    },
    editMembers: async function (id, data) {
      const response = await apiFetch("/api/user/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      dispatch({ type: "UPDATE_MEMBER", payload: response, target: data });
    },
    uploadPicture: async function (data) {
      const response = await apiFetch("/api/user/upload/", {
        method: "POST",
        body: data,
      });
      dispatch({ type: "UPDATE_PICTURE", payload: response, target: data });
    },
  };
}
