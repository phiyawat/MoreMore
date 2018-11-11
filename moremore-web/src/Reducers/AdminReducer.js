import {
  SIGN_IN_WITH_EMAIL_FOR_ADMIN,
  ADMIN_LOGOUT,
  CREATE_PDF,
  CREATE_IMAGE,
  CREATE_PRODUCT,
  RESET,
  IS_EDIT
} from "../Actions/type";

const initialState = {
  message: "",
  isLoggedIn: false,
  email: "",
  pdf: "",
  image: "",
  create: true,
  name: "",
  isEdit: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_WITH_EMAIL_FOR_ADMIN:
      console.log("dispatching", action);
      return {
        ...state,
        message: action.text,
        isLoggedIn: action.isloggedIn,
        email: action.email
      };
    case ADMIN_LOGOUT:
      console.log("dispatching", action);
      return {
        ...state,
        isLoggedIn: action.isloggedIn
      };
    case CREATE_PDF:
      console.log("dispatching", action);
      return {
        ...state,
        pdf: action.pdfFile
      };
    case CREATE_IMAGE:
      console.log("dispatching", action);
      return {
        ...state,
        image: action.imageFile
      };
    case CREATE_PRODUCT:
      console.log("dispatching", action);
      return {
        ...state,
        name: action.sheetName,
        price: action.price,
        hiLight: action.hiLight,
        longDetail: action.longDetail,
        profile: action.profile,
        create: action.create
      };
    case IS_EDIT:
      console.log("dispatching", action);
      return {
        ...state,
        isEdit: action.isEdit,
        name: action.name
      };
    case RESET:
      console.log("dispatching", action);
      return state;
    default:
      return state;
  }
}