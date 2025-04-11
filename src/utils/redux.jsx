import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadFromLocalStorage = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// Thunk pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response?.data?.body;
      saveToLocalStorage("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la connexion"
      );
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const token = loadFromLocalStorage("token", null);
      if (!token) throw new Error("Token manquant dans localStorage");

      const response = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const apiData = response?.data?.body;

      const localData = loadFromLocalStorage("user", null);

      if (
        localData &&
        localData.userName &&
        localData.firstName &&
        localData.lastName
      ) {
        return localData;
      }

      return apiData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la récupération des données utilisateur"
      );
    }
  }
);

export const updateUserNameOnServer = createAsyncThunk(
  "user/updateUserNameOnServer",
  async (userName, { rejectWithValue }) => {
    try {
      const token = loadFromLocalStorage("token", null);
      if (!token) throw new Error("Token manquant dans localStorage");

      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response?.data?.body;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour du nom d'utilisateur"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (newUserData, { rejectWithValue }) => {
    try {
      const token = loadFromLocalStorage("token", null);
      if (!token) throw new Error("Token manquant dans localStorage");

      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        newUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response?.data?.body;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour des données utilisateur"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: loadFromLocalStorage("user", {
      userName: "",
      firstName: "",
      lastName: "",
    }),
    isEditFormVisible: false,
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {
    showEditForm: (state) => {
      state.isEditFormVisible = true;
    },
    hideEditForm: (state) => {
      state.isEditFormVisible = false;
    },
    logout: (state) => {
      state.user = { userName: "", firstName: "", lastName: "" };
      state.isAuthenticated = false;
      removeFromLocalStorage("token");
      removeFromLocalStorage("user");
    },
  },
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.status = "loading";
      state.error = null;
    };

    const setFulfilled = (state, action) => {
      state.status = "succeeded";
      state.user = {
        ...state.user,

        userName: action.payload.userName,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
      state.isAuthenticated = true;
      saveToLocalStorage("user", state.user);
    };

    const setRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    };

    builder
      .addCase(loginUser.pending, setPending)
      .addCase(loginUser.fulfilled, setFulfilled)
      .addCase(loginUser.rejected, setRejected)
      .addCase(fetchUserData.pending, setPending)
      .addCase(fetchUserData.fulfilled, setFulfilled)
      .addCase(fetchUserData.rejected, setRejected)
      .addCase(updateUserProfile.fulfilled, setFulfilled)
      .addCase(updateUserProfile.rejected, setRejected)
      .addCase(updateUserNameOnServer.fulfilled, (state, action) => {
        state.user.userName = action.payload.userName;
        saveToLocalStorage("user", state.user);
      })
      .addCase(updateUserNameOnServer.rejected, setRejected);
  },
});

export const { showEditForm, hideEditForm, logout } = userSlice.actions;
export default userSlice.reducer;
