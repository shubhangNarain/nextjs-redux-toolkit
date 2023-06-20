import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchUsers = createAsyncThunk('users/getAllUsers', async (thunkApi) =>{
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
    const data = await res.json()
    return data
})


const initialState = {
    entities: [],
} as any

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.entities.push(...action.payload)
        })
    }
})

export default userSlice.reducer