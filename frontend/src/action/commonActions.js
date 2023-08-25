import { backendUrl, method_get } from "../config/config";
import { FORBIDDEN_ACTION, UNAUTHORIZED_USER } from "../types/authTypes";
import { SET_COMMON_REDUCER } from "../types/commonTypes";
import { queryBuilder } from "../utils/queryBuilder";

export const api_request = (
  method,
  path,
  body,
  query,
  loadType,
  successType,
  errorType,
  accessToken = null
) => {
  return (dispatch) => {
    dispatch({ type: loadType });
    let headers = {
      Accept: "application/json",
    };
    if (method !== method_get) {
      headers["Content-Type"] = "application/json";
    }
    if (accessToken) {
      headers["Authorization"] = "Bearer " + accessToken;
    }
    fetch(backendUrl + queryBuilder(path, query), {
      method: method,
      headers: headers,
      body: method === method_get ? null : JSON.stringify(body),
    })
      .then((response) =>
        response.json().then((data) => {
          if (response.status === 200) {
            dispatch({
              type: successType,
              payload: data.data,
              message: data.message,
              sql: data.sql,
            });
          } else if (response.status === 401) {
            dispatch({ type: UNAUTHORIZED_USER, message: data.message });
          } else if (response.status === 403) {
            dispatch({ type: FORBIDDEN_ACTION, message: data.message });
          } else {
            dispatch({ type: errorType, message: data.message });
          }
        })
      )
      .catch((err) => {
        console.error(err);
        dispatch({ type: errorType });
      });
  };
};

export const setCommon = (data) => {
  return (dispatch) => {
    dispatch({
      payload: data,
      type: SET_COMMON_REDUCER,
    });
  };
};
