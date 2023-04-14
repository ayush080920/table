import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { deleteUser } from "../thunks/deleteUser";
import { editUser } from "../thunks/editUser"

const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null,

    },

    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        builder.addCase(addUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.data.push(action.payload)
        })
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        builder.addCase(deleteUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = state.data.filter((user) => {
                return user.id !== action.payload.id
            })
        })

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        builder.addCase(editUser.pending, (state, action) => {
            state.isLoading = true


        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false
             state.data = state.data.map((user) => {
                if (user.id === action.payload.id) {
                    return action.payload.id
                }
                return user

            })
        })




        builder.addCase(editUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })

    }
})


export const usersReducer = userSlice.reducer
export const { searchUser } = userSlice.actions
