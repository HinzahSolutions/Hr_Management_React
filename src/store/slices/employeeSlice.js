// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Load initial data from localStorage
// const loadEmployeesFromStorage = () => {
//   if (typeof window !== 'undefined') {
//     const saved = localStorage.getItem('employees');
//     return saved ? JSON.parse(saved) : [
//       // Add some default data for testing
//       {
//         id: 1,
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         phone: '+1 (555) 123-4567',
//         badgeId: 'EMP001',
//         position: 'Software Engineer',
//         department: 'IT',
//         status: 'online',
//         workType: 'full-time',
//         joinDate: '2023-01-15',
//         code: 'EMP001',
//         highlight: false,
//         star: true
//       },
//       {
//         id: 2,
//         name: 'Jane Smith',
//         email: 'jane.smith@example.com',
//         phone: '+1 (555) 987-6543',
//         badgeId: 'EMP002',
//         position: 'HR Manager',
//         department: 'HR',
//         status: 'offline',
//         workType: 'full-time',
//         joinDate: '2022-08-22',
//         code: 'EMP002',
//         highlight: false,
//         star: false
//       }
//     ];
//   }
//   return [];
// };

// const loadFiltersFromStorage = () => {
//   if (typeof window !== 'undefined') {
//     const saved = localStorage.getItem('employeeFilters');
//     return saved ? JSON.parse(saved) : {};
//   }
//   return {};
// };

// export const fetchEmployees = createAsyncThunk(
//   'employees/fetchEmployees',
//   async () => {
//     // In a real app, you would fetch from API here
//     return loadEmployeesFromStorage();
//   }
// );

// export const addEmployee = createAsyncThunk(
//   'employees/addEmployee',
//   async (employeeData, { getState }) => {
//     // In a real app, you would post to API here
//     const newEmployee = {
//       id: Date.now(),
//       name: employeeData.fullName || '',
//       email: employeeData.email || '',
//       phone: employeeData.phone || '',
//       badgeId: employeeData.docNum || 'EMP' + Date.now(),
//       position: employeeData.designation || '',
//       department: employeeData.department || '',
//       status: 'offline',
//       workType: employeeData.workType || '',
//       joinDate: employeeData.joinDate || '',
//       code: employeeData.docNum || 'EMP' + Date.now(),
//       highlight: false,
//       star: false,
//       // Additional fields from form
//       dob: employeeData.dob || '',
//       address: employeeData.address || '',
//       emergencyContact: employeeData.emergencyContact || '',
//       photo: employeeData.photo || null,
//       documents: employeeData.documents || [],
//       // Work contact info
//       workEmail: employeeData.email || '',
//       personalEmail: employeeData.email || '',
//       workPhone: employeeData.phone || '',
//       personalPhone: employeeData.phone || '',
//     };
    
//     // Save to localStorage
//     const currentEmployees = loadEmployeesFromStorage();
//     const updatedEmployees = [...currentEmployees, newEmployee];
//     localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    
//     return newEmployee;
//   }
// );

// export const updateEmployee = createAsyncThunk(
//   'employees/updateEmployee',
//   async (updatedEmployee) => {
//     // In a real app, you would put to API here
//     return updatedEmployee;
//   }
// );

// export const deleteEmployees = createAsyncThunk(
//   'employees/deleteEmployees',
//   async (ids) => {
//     // Remove from localStorage
//     const currentEmployees = loadEmployeesFromStorage();
//     const updatedEmployees = currentEmployees.filter(emp => !ids.includes(emp.id));
//     localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    
//     return ids;
//   }
// );

// const employeeSlice = createSlice({
//   name: 'employees',
//   initialState: {
//     employees: [],
//     filteredEmployees: [],
//     selected: [],
//     filters: loadFiltersFromStorage(),
//     search: '',
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setSearch: (state, action) => {
//       state.search = action.payload;
//       localStorage.setItem('employeeSearch', action.payload);
//     },
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//       localStorage.setItem('employeeFilters', JSON.stringify(state.filters));
//     },
//     clearFilters: (state) => {
//       state.filters = {};
//       localStorage.removeItem('employeeFilters');
//     },
//     toggleSelect: (state, action) => {
//       const id = action.payload;
//       if (state.selected.includes(id)) {
//         state.selected = state.selected.filter(x => x !== id);
//       } else {
//         state.selected.push(id);
//       }
//     },
//     toggleSelectAll: (state, action) => {
//       // Get filtered employees count from action payload if provided
//       const filteredCount = action.payload?.filteredCount || state.filteredEmployees.length;
//       const allFilteredIds = action.payload?.filteredIds || state.filteredEmployees.map(e => e.id);
      
//       if (state.selected.length === filteredCount && filteredCount > 0) {
//         state.selected = [];
//       } else {
//         state.selected = [...allFilteredIds];
//       }
//     },
//     clearSelected: (state) => {
//       state.selected = [];
//     },
//     // Remove applyFilters from reducers since we'll handle it in extraReducers
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployees.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.employees = action.payload;
//         state.filteredEmployees = action.payload; // Initialize filteredEmployees
//         state.loading = false;
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.error = action.error.message;
//         state.loading = false;
//       })
//       .addCase(addEmployee.fulfilled, (state, action) => {
//         state.employees.push(action.payload);
//         state.filteredEmployees.push(action.payload);
//         localStorage.setItem('employees', JSON.stringify(state.employees));
//       })
//       .addCase(updateEmployee.fulfilled, (state, action) => {
//         const index = state.employees.findIndex(emp => emp.id === action.payload.id);
//         if (index !== -1) {
//           state.employees[index] = action.payload;
          
//           // Update filteredEmployees if it contains this employee
//           const filteredIndex = state.filteredEmployees.findIndex(emp => emp.id === action.payload.id);
//           if (filteredIndex !== -1) {
//             state.filteredEmployees[filteredIndex] = action.payload;
//           }
          
//           localStorage.setItem('employees', JSON.stringify(state.employees));
//         }
//       })
//       .addCase(deleteEmployees.fulfilled, (state, action) => {
//         state.employees = state.employees.filter(emp => !action.payload.includes(emp.id));
//         state.filteredEmployees = state.filteredEmployees.filter(emp => !action.payload.includes(emp.id));
//         state.selected = state.selected.filter(id => !action.payload.includes(id));
//         localStorage.setItem('employees', JSON.stringify(state.employees));
//       });
//   },
// });

// export const {
//   setSearch,
//   setFilters,
//   clearFilters,
//   toggleSelect,
//   toggleSelectAll,
//   clearSelected,
// } = employeeSlice.actions;

// export default employeeSlice.reducer;



// employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { employeeApi, transformEmployeeData, prepareEmployeeDataForAPI } from '../../superadminapis/employeeapis/employeeApiFunctions';

// Async thunks
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (params, { rejectWithValue }) => {
    try {
      const response = await employeeApi.getAllEmployees(params);
      
      // Check if we got a successful response
      if (response.status === true) {
        return response.employees; // Return the transformed array
      } else {
        return []; // Return empty array if status is false
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      // Prepare data for API
      const apiData = prepareEmployeeDataForAPI(employeeData);
      const response = await employeeApi.createEmployee(apiData);
      return transformEmployeeData(response.data || response);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const apiData = prepareEmployeeDataForAPI(employeeData);
      const response = await employeeApi.updateEmployee(id, apiData);
      return transformEmployeeData(response.data || response);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteEmployees = createAsyncThunk(
  'employees/deleteEmployees',
  async (employeeIds, { rejectWithValue }) => {
    try {
      if (employeeIds.length === 1) {
        await employeeApi.deleteEmployee(employeeIds[0]);
      } else {
        await employeeApi.deleteMultipleEmployees(employeeIds);
      }
      return employeeIds;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const filterEmployees = createAsyncThunk(
  'employees/filterEmployees',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await employeeApi.filterEmployees(filters);
      return Array.isArray(response)
        ? response.map(transformEmployeeData)
        : response.data?.map(transformEmployeeData) || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchEmployees = createAsyncThunk(
  'employees/searchEmployees',
  async ({ searchTerm, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await employeeApi.searchEmployees(searchTerm, filters);
      return Array.isArray(response)
        ? response.map(transformEmployeeData)
        : response.data?.map(transformEmployeeData) || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  employees: [],
  filteredEmployees: [],
  selected: [],
  filters: {
    department: '',
    position: '',
    status: '',
    workType: '',
    startDate: '',
    endDate: '',
  },
  search: '',
  loading: false,
  error: null,
};

// Create slice
const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.search = '';
    },
    toggleSelect: (state, action) => {
      const id = action.payload;
      if (state.selected.includes(id)) {
        state.selected = state.selected.filter(empId => empId !== id);
      } else {
        state.selected.push(id);
      }
    },
    toggleSelectAll: (state) => {
      if (state.selected.length === state.filteredEmployees.length) {
        state.selected = [];
      } else {
        state.selected = state.filteredEmployees.map(emp => emp.id);
      }
    },
    clearSelected: (state) => {
      state.selected = [];
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch employees
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.filteredEmployees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add employee
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.unshift(action.payload);
        state.filteredEmployees.unshift(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete employees
    builder
      .addCase(deleteEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployees.fulfilled, (state, action) => {
        state.loading = false;
        const deletedIds = action.payload;
        state.employees = state.employees.filter(emp => !deletedIds.includes(emp.id));
        state.filteredEmployees = state.filteredEmployees.filter(emp => !deletedIds.includes(emp.id));
        state.selected = state.selected.filter(id => !deletedIds.includes(id));
      })
      .addCase(deleteEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Filter employees
    builder
      .addCase(filterEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredEmployees = action.payload;
      })
      .addCase(filterEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Search employees
    builder
      .addCase(searchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredEmployees = action.payload;
      })
      .addCase(searchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setSearch,
  setFilters,
  clearFilters,
  toggleSelect,
  toggleSelectAll,
  clearSelected,
  setEmployees,
  clearError,
} = employeeSlice.actions;

export default employeeSlice.reducer;