import { SET_AUTH_REDUCER } from "../types/authTypes";

export const setAuthreducer = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_AUTH_REDUCER, payload: data });
  };
};
