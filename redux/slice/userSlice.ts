import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import { user } from '@/app/(tabs)/profile'

interface userState {
    _id : string,
    name : string,
    batch : string,
    role : string,
    email : string
}

const initialState : userState = {
    _id : '',
    name : '',
    batch : '',
    role : '',
    email : ''
}

const userSlice = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        setUser : (state , action: PayloadAction<userState>) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.batch = action.payload.batch
            state.role = action.payload.role
            state.email = action.payload.email
        },
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;