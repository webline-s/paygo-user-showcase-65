import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, PartyPopper, Gift } from 'lucide-react';

interface CelebrationProps {
  amount: number;
  userName?: string;
  onContinue: () => void;
}

const Celebration = ({ amount, userName, onContinue }: CelebrationProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const confettiPieces = Array.from({ length: 40 });
  const colors = ['#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#a855f7', '#ec4899', '#facc15'];

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 flex items-center justify-center p-4 overflow-hidden">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confettiPieces.map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 2;
          const duration = 2.5 + Math.random() * 2.5;
          const size = 6 + Math.random() * 8;
          const color = colors[i % colors.length];
          const rotate = Math.random() * 360;
          return (
            <span
              key={i}
              className="absolute animate-confetti-fall"
              style={{
                left: `${left}%`,
                top: '-20px',
                width: `${size}px`,
                height: `${size * 1.6}px`,
                backgroundColor: color,
                transform: `rotate(${rotate}deg)`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                borderRadius: i % 3 === 0 ? '50%' : '2px'
              }}
            />
          );
        })}
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center animate-scale-in">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg animate-bounce-slow">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-purple-400 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <PartyPopper className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-black text-purple-700">Congratulations{userName ? `, ${userName}` : ''}!</h2>
            <PartyPopper className="w-6 h-6 text-orange-500 scale-x-[-1]" />
          </div>

          <p className="text-gray-600 mb-4">You have been successfully rewarded with</p>

          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-6 mb-6 shadow-inner">
            <p className="text-white/80 text-sm mb-1">Welcome Bonus</p>
            <p className="text-white text-4xl font-black tracking-tight animate-pulse-once">
              ₦{amount.toLocaleString()}.00
            </p>
            <p className="text-white/80 text-xs mt-2">Credited to your balance</p>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Enjoy your PayGo journey — your bonus is ready to use!
          </p>

          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-6 text-lg font-bold rounded-xl hover:opacity-90 shadow-lg"
          >
            🎉 Claim & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Celebration;
