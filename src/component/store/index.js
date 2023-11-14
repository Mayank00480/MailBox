import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        isAuthenticated : false
    },
    reducers : {
     login(state){
        state.isAuthenticated = true;
     },
     logout(state){
      state.isAuthenticated = false;
     }
    }
})
const store  = configureStore({
    reducer : {
        auth : authSlice.reducer
    } 
})
export const AuthActions = authSlice.actions;
export default store;