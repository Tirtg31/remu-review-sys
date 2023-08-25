import { SET_COMMON_REDUCER } from "../types/commonTypes";

const initState = {};

const commonReducer = (state = initState, action) => {
  //   console.log(action);
  switch (action.type) {
    case SET_COMMON_REDUCER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
