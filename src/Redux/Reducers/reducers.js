import { SET_CAPTCHA } from './../Actions/actions';

const initialState = {
  captcha: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAPTCHA:
      return {
        ...state,
        captcha: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;