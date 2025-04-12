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

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response?.data?.body;

      if (data && data.token) {
        if (rememberMe) {
          console.log("Token stocké dans localStorage :", data.token);
          localStorage.setItem("token", data.token);
        } else {
          console.log("Token stocké dans sessionStorage :", data.token);
          sessionStorage.setItem("token", data.token);
        }
      } else {
        throw new Error("Token manquant dans la réponse de l'API");
      }

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Identifiants incorrects. Veuillez réessayer.";
      return rejectWithValue(errorMessage);
    }
  }
);
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        throw new Error("Token manquant dans localStorage ou sessionStorage");
      }

      const response = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response?.data?.body;
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
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token)
        throw new Error("Token manquant dans localStorage ou sessionStorage");

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
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la mise à jour du nom d'utilisateur";
      return rejectWithValue(errorMessage);
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
    isAuthenticated: !!(
      localStorage.getItem("token") || sessionStorage.getItem("token")
    ),
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
      const errorMsg =
        typeof action.payload === "string"
          ? action.payload
          : action.error?.message || "Une erreur est survenue.";

      console.error("Erreur capturée dans Redux Slice :", errorMsg);
      state.status = "failed";
      state.error = errorMsg;
      state.isAuthenticated = false;
    };

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        state.isEditFormVisible = false;
      })
      .addCase(loginUser.rejected, setRejected)
      .addCase(fetchUserData.pending, setPending)
      .addCase(fetchUserData.fulfilled, setFulfilled)
      .addCase(fetchUserData.rejected, setRejected);

    builder.addCase(updateUserNameOnServer.fulfilled, (state, action) => {
      state.user.userName = action.payload.userName;

      const syncUserData = (state) => {
        if (localStorage.getItem("token")) {
          console.log(
            "Données utilisateur stockées dans localStorage :",
            state.user
          );
          saveToLocalStorage("user", state.user);
        } else if (sessionStorage.getItem("token")) {
          console.log(
            "Données utilisateur stockées dans sessionStorage :",
            state.user
          );
          sessionStorage.setItem("user", JSON.stringify(state.user));
        }
      };
      syncUserData(state);
    });
  },
});

export const { showEditForm, hideEditForm, logout } = userSlice.actions;
export default userSlice.reducer;
