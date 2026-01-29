import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { employeeApi, transformEmployeeData, prepareEmployeeDataForAPI } from '../../superadminapis/employeeapis/employeeApiFunctions';

// Async thunks
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (params, { rejectWithValue }) => {
    try {
      const response = await employeeApi.getAllEmployees(params);
      
      // Check if we got a successful response
      if (response.status === true && Array.isArray(response.employees)) {
        return response.employees;
      } else if (response.status === false) {
        return []; // Return empty array if API returned false status
      } else if (Array.isArray(response)) {
        return response.map(transformEmployeeData);
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch employees');
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
      
      // Transform and return the new employee data
      const newEmployee = transformEmployeeData(response.data || response);
      return newEmployee;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to add employee');
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
      // Filter on the client side if API doesn't support filtering
      if (employeeApi.filterEmployees) {
        const response = await employeeApi.filterEmployees(filters);
        if (Array.isArray(response)) {
          return response.map(transformEmployeeData);
        } else if (response.data && Array.isArray(response.data)) {
          return response.data.map(transformEmployeeData);
        } else {
          return [];
        }
      } else {
        // Client-side filtering fallback
        const allEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
        let filtered = [...allEmployees];
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== '') {
            filtered = filtered.filter(emp => 
              String(emp[key] || '').toLowerCase().includes(String(value).toLowerCase())
            );
          }
        });
        
        return filtered;
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to filter employees');
    }
  }
);

export const searchEmployees = createAsyncThunk(
  'employees/searchEmployees',
  async ({ searchTerm, filters = {} }, { rejectWithValue }) => {
    try {
      if (employeeApi.searchEmployees) {
        const response = await employeeApi.searchEmployees(searchTerm, filters);
        if (Array.isArray(response)) {
          return response.map(transformEmployeeData);
        } else if (response.data && Array.isArray(response.data)) {
          return response.data.map(transformEmployeeData);
        } else {
          return [];
        }
      } else {
        // Client-side search fallback
        const allEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
        let results = [...allEmployees];
        
        // Apply filters first if any
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== '') {
            results = results.filter(emp => 
              String(emp[key] || '').toLowerCase().includes(String(value).toLowerCase())
            );
          }
        });
        
        // Then apply search
        if (searchTerm && searchTerm.length >= 2) {
          const term = searchTerm.toLowerCase();
          results = results.filter(emp =>
            (emp.name && emp.name.toLowerCase().includes(term)) ||
            (emp.email && emp.email.toLowerCase().includes(term)) ||
            (emp.code && emp.code.toLowerCase().includes(term)) ||
            (emp.position && emp.position.toLowerCase().includes(term))
          );
        }
        
        return results;
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to search employees');
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
      state.filteredEmployees = state.employees; // Reset filtered to all employees
    },
    toggleSelect: (state, action) => {
      const id = action.payload;
      if (state.selected.includes(id)) {
        state.selected = state.selected.filter(empId => empId !== id);
      } else {
        state.selected.push(id);
      }
    },
    toggleSelectAll: (state, action) => {
      const allIds = action.payload || state.filteredEmployees.map(emp => emp.id);
      if (state.selected.length === allIds.length) {
        state.selected = [];
      } else {
        state.selected = [...allIds];
      }
    },
    clearSelected: (state) => {
      state.selected = [];
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
      state.filteredEmployees = action.payload; // Also set filteredEmployees
    },
    clearError: (state) => {
      state.error = null;
    },
    // Add a new reducer to manually refresh employees
    refreshEmployees: (state, action) => {
      state.employees = action.payload;
      state.filteredEmployees = action.payload;
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
        state.filteredEmployees = action.payload; // Initialize filteredEmployees with all employees
        state.error = null;
        
        // Store in localStorage for client-side operations
        if (typeof window !== 'undefined') {
          localStorage.setItem('employees', JSON.stringify(action.payload));
        }
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add employee - FIXED to update both arrays
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const newEmployee = action.payload;
        
        // Add to employees array
        state.employees = [newEmployee, ...state.employees];
        
        // Check if the new employee matches current filters
        const matchesFilters = Object.entries(state.filters).every(([key, value]) => {
          if (!value || value === '') return true;
          const empValue = newEmployee[key] || '';
          return String(empValue).toLowerCase().includes(String(value).toLowerCase());
        });
        
        // Check if matches search
        const matchesSearch = !state.search || state.search.length < 2 || 
          newEmployee.name?.toLowerCase().includes(state.search.toLowerCase()) ||
          newEmployee.email?.toLowerCase().includes(state.search.toLowerCase());
        
        // Add to filteredEmployees if matches both filters and search
        if (matchesFilters && matchesSearch) {
          state.filteredEmployees = [newEmployee, ...state.filteredEmployees];
        }
        
        state.error = null;
        
        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('employees', JSON.stringify(state.employees));
        }
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
        
        // Remove from both arrays
        state.employees = state.employees.filter(emp => !deletedIds.includes(emp.id));
        state.filteredEmployees = state.filteredEmployees.filter(emp => !deletedIds.includes(emp.id));
        state.selected = state.selected.filter(id => !deletedIds.includes(id));
        state.error = null;
        
        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('employees', JSON.stringify(state.employees));
        }
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
        state.error = null;
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
        state.error = null;
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
  refreshEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;