import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEmployeeAPI, deleteEmployeeAPI, /*fetchEmployeeByIdAPI,*/ fetchEmployeesAPI, updateEmployeeAPI } from "../api/employeeApi";



// Thunk to fetch employees
export const getEmployees = createAsyncThunk('employees/getEmployees', async (_, thunkAPI) => {
    try {
        const data = await fetchEmployeesAPI();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.reponse?.data || 'Fetch failed');
    }
});


// POST add new employee
export const addNewEmployees = createAsyncThunk('employees/addNewEmployees', async (employeeData, thunkAPI) => {
    try {
        const data = await createEmployeeAPI(employeeData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.reponse?.data || 'Add failed');
    }
});


// DELETE single employee
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (employee, thunkAPI) => {
    try {
        const data = await deleteEmployeeAPI(employee);
        return data.employee_id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Delete failed');
    }
});


//PUT updated single employee
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ updatedData }, thunkAPI) => {
    try {
        const data = await updateEmployeeAPI(updatedData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Updated failed');
    }
});


//GET employee Id
// export const fetchEmployeeById = createAsyncThunk('employees/fetchEmployeeById', async (id) => {
//     try {
//         const data = await fetchEmployeeByIdAPI(id);
//         return data;
//     } catch (error) {
//         // return thunkAPI.rejectWithValue(error.reponse?.data || 'Fetch Ids failed');
//         return thunkAPI.rejectWithValue(error.response?.data || 'Some fallback error');
//     }
// });


const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        loading: false,
        error: null,
        // selectedEmployee: null,   // <-- new field to store one employee
    },
    reducers: {},
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

            //POST add new employee
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

            //DELETE single employee
            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((emp) => emp.employee_id !== action.payload);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            //PUT updated single employee
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.map(emp =>
                    emp.employee_id === action.payload.employee_id ? action.payload : emp
                );
                // console.log(state.data);
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // //GET employee Id
            // .addCase(fetchEmployeeById.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchEmployeeById.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.selectedEmployee = action.payload;
            // })
            // .addCase(fetchEmployeeById.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload || action.error.message;
            // })
    },
});

export default employeeSlice.reducer;