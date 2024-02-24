export const SET_CAPTCHA = 'SET_CAPTCHA';

export const setCaptcha = (captcha) => ({
  type: SET_CAPTCHA,
  payload: captcha,
});


export const generateCaptcha = () => {
    return (dispatch) => {
      const newCaptcha = Math.floor(Math.random() * 999999);
      dispatch(setCaptcha(newCaptcha));
    };
  };