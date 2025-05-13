import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth-provider';
import { Layout } from '@/components/layout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/auth/login';
import { Register } from '@/pages/auth/register';
import { Dashboard } from '@/pages/dashboard';
import { Profile } from '@/pages/profile';
import { NotFound } from '@/pages/not-found';
import { PrivateRoute } from '@/components/auth/PrivateRoute';

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="uxerra-theme">
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
