import { SHOW_CFPASSWORD,HIDE_CFPASSWORD } from "../Share/Constants";
import { SHOW_PASSWORD,HIDE_PASSWORD } from "../Share/Constants";

//show password
export const initState = {
    eyeState: 'block',
    closeEyeState: 'none',
    passwordType: 'password'
  }

 export const reducer = (state, action) => {
    switch(action){
  
      case SHOW_PASSWORD:
        return {
          eyeState: 'none',
          closeEyeState: 'block',
          passwordType: 'text'
        }
  
      case HIDE_PASSWORD:
        return {
          eyeState: 'block',
          closeEyeState: 'none',
          passwordType: 'password'
        }
  
      default:
        console.log('no')
    }
  }
  

//show confirm password
export const cfInitState = {
    cfEyeState: 'block',
    cfCloseEyeState: 'none',
    cfPasswordType: 'password'
  }

 export const cfReducer = (state, action) => {
    switch(action){
  
      case SHOW_CFPASSWORD:
        return {
            cfEyeState: 'none',
            cfCloseEyeState: 'block',
            cfPasswordType: 'text'
        }
  
      case HIDE_CFPASSWORD:
        return {
            cfEyeState: 'block',
            cfCloseEyeState: 'none',
            cfPasswordType: 'password'
        }
  
      default:
        console.log('no')
    }
  }