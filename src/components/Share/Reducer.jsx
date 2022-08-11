import {
  ANSWER,
  BTN_BACK,
  BTN_NEXT,
  HIDE_CFPASSWORD,
  HIDE_PASSWORD,
  SETDATA,
  SHOW_CFPASSWORD,
  SHOW_PASSWORD,
} from "../Share/Constants";

//show password
export const initState = {
  eyeState: "block",
  closeEyeState: "none",
  passwordType: "password",
  index: 0,
  displayBack: "hidden",
  displayNext: "block",
  displaySubmit: "none",
  storeAns: [],
  data: [],
};

export const reducer = (state, action) => {
  switch (action) {
    case SHOW_PASSWORD:
      return {
        eyeState: "none",
        closeEyeState: "block",
        passwordType: "text",
      };

    case HIDE_PASSWORD:
      return {
        eyeState: "block",
        closeEyeState: "none",
        passwordType: "password",
      };

    default:
      console.log("no");
  }
};

//show confirm password
export const cfInitState = {
  cfEyeState: "block",
  cfCloseEyeState: "none",
  cfPasswordType: "password",
};

export const cfReducer = (state, action) => {
  switch (action) {
    case SHOW_CFPASSWORD:
      return {
        cfEyeState: "none",
        cfCloseEyeState: "block",
        cfPasswordType: "text",
      };

    case HIDE_CFPASSWORD:
      return {
        cfEyeState: "block",
        cfCloseEyeState: "none",
        cfPasswordType: "password",
      };

    default:
      console.log("no");
  }
};

//data
export const dataReducer = (state, action) => {
  switch (action.type) {
    case SETDATA:
      return {
        ...state,
        data: action.data,
      };

    case BTN_BACK:
      if (state.index === 1) {
        return {
          ...state,
          prevIndex: state.index,
          index: 0,
          displayBack: "hidden",
          displayNext: "block",
          displaySubmit: "none",
        };
      }
      return {
        ...state,
        prevIndex: state.index,
        index: state.index - 1,
      };

    case ANSWER:
      const indexAns = state.storeAns.findIndex((a) => a.id === action.data.id);
      const newState = { ...state };
      if (indexAns !== -1) {
        newState.storeAns[indexAns].answer = action.data.answer;
      } else {
        newState.storeAns.push(action.data);
      }
      return {
        ...newState,
      };

    case BTN_NEXT:
      if (state.index === state.data.length - 2) {
        return {
          ...state,
          prevIndex: state.index,
          index: state.data.length - 1,
          displayBack: "visible",
          displayNext: "none",
          displaySubmit: "block",
        };
      }

      return {
        ...state,
        prevIndex: state.index,
        index: state.index + 1,
        displayBack: "visible",
        displayNext: "block",
        displaySubmit: "none",
      };
    default:
      console.log("no");
  }
};
