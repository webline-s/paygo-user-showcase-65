
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login = ({ onSwitchToRegister }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const loginSuccess = login(email, password);
      if (!loginSuccess) {
        setError('Invalid email or password. Please check your credentials.');
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-right mb-4">
            <a 
              href="https://wa.me/2348114785280" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 text-sm hover:underline"
            >
              Need Help?
            </a>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-orange-400 text-white text-2xl font-bold py-8 px-12 rounded-2xl mb-8 mx-auto w-fit overflow-hidden relative">
            <div className="animate-slide-left text-white font-bold">
              PAYGO
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-center text-black mb-8">
            Login to continue
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 text-lg font-medium rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          <p className="text-center mt-6 text-purple-600 cursor-pointer hover:underline" onClick={onSwitchToRegister}>
            Don't have an account? Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
