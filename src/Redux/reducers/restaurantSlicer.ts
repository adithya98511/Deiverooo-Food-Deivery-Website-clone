import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import apiClient from '../../apiServices';

interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
}

interface RestaurantState {
  restaurants: Restaurant[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  selectedRestaurantId: number | null; 
}

const initialState: RestaurantState = {
  restaurants: [],
  status: 'idle',
  error: null,
  selectedRestaurantId: null,  // Initialize selectedRestaurantId
};

export const fetchRestaurants = createAsyncThunk<Restaurant[], void, { state: RootState }>(
  'restaurants/fetchRestaurants',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const authToken = auth.accessToken || localStorage.getItem('authToken'); // Get token from Redux store or localStorage

    if (!authToken) {
      return rejectWithValue('User is not logged in.');
    }

    try {
      const response = await apiClient.get<Restaurant[]>('/restaurants', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch restaurants');
    }
  }
);

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setSelectedRestaurantId: (state, action) => {
      state.selectedRestaurantId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'idle';
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectSelectedRestaurantId = (state: RootState) => state.restaurants.selectedRestaurantId;


// Export setSelectedRestaurantId to use in your components
export const { setSelectedRestaurantId } = restaurantSlice.actions;

export default restaurantSlice.reducer;
