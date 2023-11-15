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
const sentItems = createSlice({
    name : 'sentEmails ',
    initialState : {
        items : []
    }
    ,reducers :{
        addItems(state,action){
          state.items.push(action.payload)
        }
    }
})
const store  = configureStore({
    reducer : {
        auth : authSlice.reducer,
        sentItems : sentItems.reducer
    } 
})
export const sentEmails = sentItems.actions; 
export const AuthActions = authSlice.actions;
export default store;