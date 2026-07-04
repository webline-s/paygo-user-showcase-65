
import { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import Register from '../components/Register';
import Welcome from '../components/Welcome';
import Dashboard from '../components/Dashboard';
import AppLoader from '../components/AppLoader';

const AppContent = () => {
  const { user, isWelcomeComplete, isInitializing } = useAuth();

  if (isInitializing) {
    return <AppLoader label="Getting things ready..." />;
  }

  if (!user) {
    return <AuthFlow />;
  }

  if (!isWelcomeComplete) {
    return <Welcome />;
  }

  return <Dashboard />;
};

const AuthFlow = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default Index;
