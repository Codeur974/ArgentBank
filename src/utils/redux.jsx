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

      const userData = { email, username: profileData.username };

      // 🔹 Stockage des données
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("token", token);
      }

      console.log("Dispatching loginSuccess"); // Ajoutez ce log pour vérifier que l'action est dispatchée
      dispatch(loginSuccess({ email, username: profileData.username, token }));
    } catch (error) {
      console.log(error);
      return rejectWithValue("Erreur serveur");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || { email: "", username: "" },
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
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
      };
      state.token = action.payload.token;
      state.isAuthenticated = true; // ✅ Mise à jour de l'état isAuthenticated
      state.errors = {};
    },
    logout: (state) => {
      state.user = { email: "", username: "" };
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const { loginSuccess, logout, setError } = userSlice.actions;
export default userSlice.reducer;
