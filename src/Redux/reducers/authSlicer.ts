// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import apiClient from '../../apiServices';

// interface AuthState {
//   userId: string | null;
//   userRole : string | null;
//   accessToken: string | null;
//   refreshToken: string | null;
//   status: 'idle' | 'loading' | 'failed';
//   error: string | null;
// }

// const initialState: AuthState = {
//   userId: localStorage.getItem('userId') || null,
//   accessToken: localStorage.getItem('authToken') || null,
//   refreshToken: localStorage.getItem('refreshToken') || null,
//   status: 'idle',
//   error: null,
// };

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await apiClient.post('/login', credentials);

//       const { access_token, refresh_token, userId } = response.data;

//       localStorage.setItem('authToken', access_token);
//       localStorage.setItem('refreshToken', refresh_token);
//       localStorage.setItem('userId', userId);

//       return { accessToken: access_token, refreshToken: refresh_token, userId };
//     } catch (error: any) {
//       return rejectWithValue(error.response.data || 'Login failed');
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout(state) {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('userId');
//       state.userId = null;
//       state.accessToken = null;
//       state.refreshToken = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.userId = action.payload.userId;
//         state.accessToken = action.payload.accessToken;
//         state.refreshToken = action.payload.refreshToken;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import apiClient from '../../apiServices';

// interface AuthState {
//   userId: string | null;
//   userRole: string | null;  // Add userRole here
//   accessToken: string | null;
//   refreshToken: string | null;
//   status: 'idle' | 'loading' | 'failed';
//   error: string | null;
// }

// const initialState: AuthState = {
//   userId: localStorage.getItem('userId') || null,
//   userRole: localStorage.getItem('userRole') || null,  // Load userRole from local storage
//   accessToken: localStorage.getItem('authToken') || null,
//   refreshToken: localStorage.getItem('refreshToken') || null,
//   status: 'idle',
//   error: null,
// };

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await apiClient.post('/login', credentials);

//       const { access_token, refresh_token, userId, userRole } = response.data; // Get the role from the response

//       localStorage.setItem('authToken', access_token);
//       localStorage.setItem('refreshToken', refresh_token);
//       localStorage.setItem('userId', userId);
//       localStorage.setItem('userRole', userRole);  // Save role in local storage

//       return { accessToken: access_token, refreshToken: refresh_token, userId, userRole: userRole };  // Return the role
//     } catch (error: any) {
//       return rejectWithValue(error.response.data || 'Login failed');
//     }
//   }
// );
// export const signUpUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials: { email: string; password: string; password_re: string }, { rejectWithValue }) => {
//     try {
//       const response = await apiClient.post('/signup', credentials);

//       const { error, message, user } = response.data; 
//       return { error : error , message: message , user : user };  // Return the role
//     } catch (error: any) {
//       return rejectWithValue(error.response.data || 'Signup Failed');
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout(state) {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('userId');
//       localStorage.removeItem('userRole')
//       state.userId = null;
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.userRole = null; 
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.userId = action.payload.userId;
//         state.accessToken = action.payload.accessToken;
//         state.refreshToken = action.payload.refreshToken;
//         state.userRole = action.payload.userRole;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../apiServices';

interface AuthState {
  userId: string | null;
  userRole: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  userId: localStorage.getItem('userId') || null,
  userRole: localStorage.getItem('userRole') || null,
  accessToken: localStorage.getItem('authToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  status: 'idle',
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/login', credentials);
      const { access_token, refresh_token, userId, userRole } = response.data;

      localStorage.setItem('authToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userRole', userRole);

      return { accessToken: access_token, refreshToken: refresh_token, userId, userRole };
    } catch (error: any) {
      return rejectWithValue(error.response.data || 'Login failed');
    }
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (credentials: { email: string; password: string; password_re: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/signup', credentials);
      const { error, message, user } = response.data;

      if (error) {
        return rejectWithValue(error);  // Pass error from the backend
      }

      return { message, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Signup failed'); // Pass server error or a default message
    }
  }
);


// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.userRole = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userId = action.payload.userId;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userRole = action.payload.userRole;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // signUpUser cases
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.error || null;
        // Optionally handle successful signup (e.g., redirect, etc.)
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
