import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Thunk pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password, rememberMe }, { dispatch, rejectWithValue }) => {
    try {
      // 🔹 Étape 1 : Connexion (POST /login)
      const loginResponse = await fetch(
        "http://localhost:3001/api/v1/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const loginData = await loginResponse.json();
      console.log("Login Response:", loginData); // Ajoutez ce log pour voir la réponse de l'API
      if (!loginResponse.ok) {
        return rejectWithValue(loginData.error || "Échec de la connexion");
      }

      const token = loginData.body.token; // Assurez-vous d'extraire le token correctement
      if (!token) {
        return rejectWithValue("Token manquant !");
      }

      // 🔹 Étape 2 : Récupération du profil (GET /profile)
      const profileResponse = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profileData = await profileResponse.json();
      console.log("Profile Response:", profileData); // Ajoutez ce log pour voir la réponse de l'API
      if (!profileResponse.ok) {
        return rejectWithValue(
          profileData.error || "Échec de la récupération du profil"
        );
      }

      const userData = {
        email,
        username: profileData.username,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      };

      // 🔹 Stockage des données
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("token", token);
      }

      console.log("Dispatching loginSuccess"); // Ajoutez ce log pour vérifier que l'action est dispatchée
      dispatch(
        loginSuccess({
          email,
          username: profileData.username,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          token,
        })
      );
    } catch (error) {
      console.log(error);
      return rejectWithValue("Erreur serveur");
    }
  }
);

// ✅ Thunk pour récupérer les données de l'utilisateur
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Token manquant !");
      }

      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(
          data.error || "Échec de la récupération des données de l'utilisateur"
        );
      }

      return data.body;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Erreur serveur");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user")) || {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
    },
  token:
    localStorage.getItem("token") || sessionStorage.getItem("token") || null,
  isAuthenticated:
    !!localStorage.getItem("token") || !!sessionStorage.getItem("token"),
  isEditFormVisible: false,
  errors: {},
};

// ✅ Reducer avec actions Redux
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("loginSuccess called"); // Ajoutez ce log pour vérifier que le reducer est appelé
      state.user = {
        email: action.payload.email,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
      state.token = action.payload.token;
      state.isAuthenticated = true; // ✅ Mise à jour de l'état isAuthenticated
      state.errors = {};
    },
    logout: (state) => {
      state.user = {
        email: "",
        username: state.user.username,
        firstName: "",
        lastName: "",
      };
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.errors = action.payload;
    },
    showEditForm: (state) => {
      state.isEditFormVisible = true;
    },
    hideEditForm: (state) => {
      state.isEditFormVisible = false;
    },
    updateUsername: (state, action) => {
      state.user.username = action.payload;
      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));
      user.username = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("user", JSON.stringify(user));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
    });
  },
});

export const {
  loginSuccess,
  logout,
  setError,
  showEditForm,
  hideEditForm,
  updateUsername,
} = userSlice.actions;
export default userSlice.reducer;
