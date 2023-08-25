import {
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  FORBIDDEN_ACTION,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  REGISTRATION_ERROR,
  REGISTRATION_LOADING,
  REGISTRATION_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  SET_AUTH_REDUCER,
  TOKEN_REFRESH_ERROR,
  TOKEN_REFRESH_SUCCESS,
  UNAUTHORIZED_USER,
  USER_VERIFICATION_ERROR,
  USER_VERIFICATION_LOADING,
  USER_VERIFICATION_SUCCESS,
} from "../types/authTypes";

const initState = {
  authError: "",
  authLoading: "",
  user: null,
  data: null,
  authErrorMessage: null,

  registrationLoading: false,
  registrationSuccess: false,
  registrationError: false,
  registrationMessage: null,

  userVerificationLoading: false,
  userVerificationSuccess: false,
  userVerificationError: false,
  userVerificationMessage: null,

  logoutLoading: false,
  logoutError: false,
  logoutMessage: null,

  resetPasswordLoading: false,
  resetPasswordSuccess: false,
  resetPasswordError: false,
  resetPasswordMessage: null,

  changePasswordLoading: false,
  changePasswordSuccess: false,
  changePasswordError: false,
  changePasswordMessage: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        authError: null,
        authLoading: true,
        user: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
        authLoading: false,
        user: {
          ...action.payload,
          accessToken: action.payload?.accessToken,
          refreshAccessToken: action.payload?.refreshAccessToken,
        },
        data: action.payload?.userData,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authError: true,
        authLoading: false,
        authErrorMessage: action?.message,
      };
    case UNAUTHORIZED_USER:
      if (action?.message === "Unauthorised access") {
        // swal("", "Session Expired!\nPlease login again", "info");
      } else {
        alert(action?.message || "Please Login again");
      }
      return {
        ...state,
        authLoading: false,
        user: null,
        authErrorMessage: action?.message || "Please login again",
      };
    case FORBIDDEN_ACTION:
      // swal("", "Session Expired!\nPlease login again", "info");
      return {
        ...state,
        authLoading: false,
        user: null,
        authErrorMessage: action?.message || "Please login again",
      };
    case REGISTRATION_LOADING:
      return {
        ...state,
        registrationLoading: true,
        registrationSuccess: false,
        registrationError: false,
        registrationMessage: null,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationLoading: false,
        registrationSuccess: true,
        registrationError: false,
        registrationMessage:
          action?.message ||
          "Successfully Registered! Now check your to validate your user account",
      };
    case SET_AUTH_REDUCER:
      return { ...state, ...action.payload };
    case REGISTRATION_ERROR:
      return {
        ...state,
        registrationLoading: false,
        registrationSuccess: false,
        registrationError: true,
        registrationMessage: action?.message || "Failed to register",
      };
    case USER_VERIFICATION_LOADING:
      return {
        ...state,
        userVerificationLoading: true,
        userVerificationSuccess: false,
        userVerificationError: false,
        userVerificationMessage: null,
      };
    case USER_VERIFICATION_SUCCESS:
      return {
        ...state,
        userVerificationLoading: false,
        userVerificationSuccess: true,
        userVerificationError: false,
        userVerificationMessage: action.message,
      };
    case USER_VERIFICATION_ERROR:
      return {
        ...state,
        userVerificationLoading: false,
        userVerificationSuccess: false,
        userVerificationError: true,
        userVerificationMessage: action.message,
      };
    case LOGOUT_LOADING:
      return {
        ...state,
        logoutLoading: true,
        logoutError: false,
        logoutMessage: null,
      };
    case LOGOUT_SUCCESS:
      return { ...state, user: null, data: null };
    case LOGOUT_ERROR:
      // alert(action.message || "Logout Error");
      return { ...state };
    case TOKEN_REFRESH_SUCCESS:
      return {
        ...state,
        user: { ...state.user, accessToken: action.payload },
      };
    case TOKEN_REFRESH_ERROR:
      alert("Your session has expired");
      return initState;
    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        resetPasswordLoading: true,
        resetPasswordSuccess: false,
        resetPasswordError: false,
        resetPasswordMessage: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordSuccess: true,
        resetPasswordError: false,
        resetPasswordMessage:
          action.message || "Check your mail to reset your password",
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordSuccess: false,
        resetPasswordError: true,
        resetPasswordMessage:
          action.message || "Error to reset password verification",
      };
    case CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordSuccess: false,
        changePasswordError: false,
        changePasswordMessage: null,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: true,
        changePasswordError: false,
        changePasswordMessage:
          action.message || "Password changed successfully",
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: false,
        changePasswordError: true,
        changePasswordMessage: action.message || "Error to change password",
      };
    default:
      return state;
  }
};
export default authReducer;
