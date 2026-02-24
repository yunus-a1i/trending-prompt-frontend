export interface User {
  name?: string;
  email?: string;
  role?: "user" | "admin";
}

export interface AuthState {
  userId: string | null;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
