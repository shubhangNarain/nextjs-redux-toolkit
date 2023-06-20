import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchUsers = createAsyncThunk('users/getAllUsers', async (thunkApi) =>{
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=10')
    const data = await res.json()
    return data
})


const initialState = {
    entities: [],
    loading : false,
    value: 10
} as any

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {
            state.value++
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.entities.push(...action.payload)
            state.loading = false
        })

        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true
        })
    }
})

export const { increment } = userSlice.actions

export default userSlice.reducer