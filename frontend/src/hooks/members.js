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
        massage: action.payload.message,
        members: action.payload.data,
        loading: false,
      };
    case "DELETE_MEMBER":
      return {
        ...state,
        massage: action.payload.message,
        members: action.payload,
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
    log: console.log({ members: state.members, loading: state.loading }),
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
        await apiFetch("/api/user/" + id_member, { method: "DELETE" }) // Delete user from API
          .then((res) => {
            console.log({ "before dispatch": res });
            res = state.members[0].filter((m) => m._id !== res.data._id);
            console.log(res);
            dispatch({ type: "DELETE_MEMBER", payload: res }); // Delete member from state
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.error(err);
      }
    },
  };
}
