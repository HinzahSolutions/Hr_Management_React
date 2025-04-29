import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEmployee, fetchEmployees } from "../api/employeeApi";


// Thunk to fetch employees
export const getEmployees = createAsyncThunk(
    'employees/getEmployees',
    async (_, thunkAPI) => {
        try {
            const data = await fetchEmployees();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.reponse?.data || 'Fetch failed');
        }
    }
);


// POST new employee
export const addNewEmployees = createAsyncThunk(
    'employees/addNewEmployees',
    async (employeeData, thunkAPI) => {
        try {
            const data = await createEmployee(employeeData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.reponse?.data || 'Add failed');
        }
    }
);


const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            //GET employees
            .addCase(getEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            //POST new employee
            .addCase(addNewEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(addNewEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default employeeSlice.reducer;