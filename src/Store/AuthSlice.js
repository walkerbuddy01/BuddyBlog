import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userData:null,
    login:false
}


const auth = createSlice({
    name:"auth", 
    initialState,
    reducers:{
        login:(state,action)=>{
            state.login = true
            state.userData = action.payload;
        },
        logout:(state)=>{
            state.login = false,
            state.userData = null
        }
    }
})

export const  {login,logout} = auth.actions;
export default auth.reducer;