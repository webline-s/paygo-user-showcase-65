import { Button } from '@/components/ui/button';
import { Bell, Eye, EyeOff, ArrowUp, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
interface DashboardHeaderProps {
  balanceVisible: boolean;
  setBalanceVisible: (visible: boolean) => void;
  onTransactionHistory: () => void;
  onLogout: () => void;
  onUpgrade: () => void;
  onTransfer: () => void;
}
const DashboardHeader = ({
  balanceVisible,
  setBalanceVisible,
  onTransactionHistory,
  onLogout,
  onUpgrade,
  onTransfer
}: DashboardHeaderProps) => {
  const {
    user
  } = useAuth();
  return <div className="mx-2">
      <div className="bg-purple-900 text-white p-4 rounded-b-3xl mx-px my-0 px-[12px] py-[10px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Hi, {user?.name} 👋</h1>
              <p className="text-sm opacity-90">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={onTransactionHistory} className="bg-white/20 hover:bg-white/30 p-2 rounded-full">
              <Bell className="w-6 h-6" />
            </Button>
            <Button onClick={onLogout} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm">
              Logout
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <p className="text-sm opacity-90 mb-2">Your Balance</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {balanceVisible ? `₦${(user?.balance || 0).toLocaleString()}.00` : '₦***,***.00'}
              </h2>
              <p className="text-sm opacity-90">Weekly Rewards: ₦180,000.00</p>
            </div>
            <Button onClick={() => setBalanceVisible(!balanceVisible)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full">
              {balanceVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button onClick={onUpgrade} className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3 flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Upgrade</span>
            </Button>
            <Button onClick={onTransfer} className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3 flex items-center justify-center space-x-2">
              <ArrowUp className="w-5 h-5" />
              <span>Transfer</span>
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default DashboardHeader;