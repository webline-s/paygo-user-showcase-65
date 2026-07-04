import { Button } from '@/components/ui/button';
import { Bell, Eye, EyeOff, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
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
  onTransfer,
}: DashboardHeaderProps) => {
  const { user } = useAuth();
  const balance = user?.balance ?? 0;
  const referralBalance = user?.referralBalance ?? 0;

  return (
    <div className="px-3 pt-2">
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white rounded-3xl px-4 pt-4 pb-5 shadow-xl">
        {/* Decorative glow orbs */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-orange-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar */}
        <div className="relative flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center ring-2 ring-white/30 shadow-lg">
              <span className="text-white font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">Hi, {user?.name} 👋</h1>
              <p className="text-xs opacity-80">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onTransactionHistory}
              className="bg-white/15 hover:bg-white/25 p-2.5 rounded-full backdrop-blur-sm transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={onLogout}
              className="bg-white/15 hover:bg-white/25 text-white px-3.5 py-2 rounded-full text-xs font-semibold backdrop-blur-sm transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/15 shadow-inner">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/70 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Available Balance
            </div>
            <button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="bg-white/15 hover:bg-white/25 p-1.5 rounded-full transition"
              aria-label="Toggle balance visibility"
            >
              {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-semibold text-white/90">₦</span>
            <span className="text-4xl font-black tracking-tight tabular-nums">
              {balanceVisible ? balance.toLocaleString() : '•••••••'}
            </span>
            <span className="text-lg font-semibold text-white/70">.00</span>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-white/60">Referral Bonus</p>
              <p className="text-sm font-bold text-white">
                {balanceVisible ? `₦${referralBalance.toLocaleString()}.00` : '₦••••'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-white/80 bg-white/10 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              Secured
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              onClick={onUpgrade}
              className="flex-1 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl py-5 flex items-center justify-center gap-2 font-semibold backdrop-blur-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Upgrade</span>
            </Button>
            <Button
              onClick={onTransfer}
              className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white rounded-xl py-5 flex items-center justify-center gap-2 font-semibold shadow-lg"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Transfer</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
