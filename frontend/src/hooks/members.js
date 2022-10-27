import { useReducer } from "react";
import { apiFetch } from "../utils/Api";

function reducer(state, action) {
  console.log("MEMBERS_REDUCER", action.type, action);
  switch (action.type) {
    case "FETCHING_MEMBERS":
      return { ...state, loading: true };
    case "SET_MEMBERS":
      return { ...state, members: action.payload, loading: false };
    case "DELETE_MEMBER":
      return {
        ...state,
        members: state.members.filter((m) => m !== action.payload),
      };
    case "ADD_MEMBER":
      return { ...state, members: [...state.members, action.payload] };
    case "UPDATE_MEMBER":
      return {
        ...state,
        members: state.members.map((m) =>
          m === action.target ? action.payload : m
        ),
      };
    default:
      break;
  }
}

export function useMembers() {
  const [state, dispatch] = useReducer(reducer, {
    members: null,
    loading: false,
  });

  return {
    members: state.members, // array of members
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
    deleteMember: async function (id_member) {
      try {
        const member = await apiFetch(`/api/user/${id_member._id}`, {
          method: "GET",
        }); // Delete user from API
        dispatch({ type: "DELETE_MEMBER", payload: member }); // Delete member from state
      } catch (err) {
        console.error(err);
      }
    },
  };
}
