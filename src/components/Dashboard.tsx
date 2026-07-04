import { useState, useEffect } from 'react';
import { CarouselApi } from '@/components/ui/carousel';
import { useAuth } from '../contexts/AuthContext';
import { useAutoSlide } from '../hooks/useAutoSlide';
import BuyPayId from './BuyPayId';
import Transfer from './Transfer';
import Airtime from './Airtime';
import Data from './Data';
import Support from './Support';
import EarnMore from './EarnMore';
import Profile from './Profile';
import ProfileInfo from './ProfileInfo';
import About from './About';
import TransactionHistory from './TransactionHistory';
import ReferEarn from './ReferEarn';
import Upgrade from './Upgrade';
import JoinCommunities from './JoinCommunities';
import Onboarding from './Onboarding';
import ReferEarnPopup from './ReferEarnPopup';
import DashboardHeader from './DashboardHeader';
import QuickActions from './QuickActions';
import PromotionsCarousel from './PromotionsCarousel';
import LogoutDialog from './LogoutDialog';
import AppLoader from './AppLoader';

const Dashboard = () => {
  const { logout, isOnboardingComplete, completeOnboarding, showReferPopup, hideReferPopup } = useAuth();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [currentView, setCurrentView] = useState('dashboard');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showOnboardingPopup, setShowOnboardingPopup] = useState(!isOnboardingComplete);
  const [navLoading, setNavLoading] = useState(false);

  useAutoSlide(api, 4000);

  const navigateTo = (view: string) => {
    if (view === currentView) return;
    setNavLoading(true);
    setTimeout(() => {
      setCurrentView(view);
      setNavLoading(false);
    }, 600);
  };

  const handleLogout = () => setShowLogoutDialog(true);
  const confirmLogout = () => {
    setNavLoading(true);
    setTimeout(() => {
      logout();
      setShowLogoutDialog(false);
      setNavLoading(false);
    }, 600);
  };
  const cancelLogout = () => setShowLogoutDialog(false);

  const handleCompleteOnboarding = () => {
    completeOnboarding();
    setShowOnboardingPopup(false);
  };

  if (navLoading) {
    return <AppLoader label="Loading..." />;
  }

  if (currentView === 'buy-pay-id') return <BuyPayId onBack={() => navigateTo('dashboard')} />;
  if (currentView === 'transfer') return <Transfer onBack={() => navigateTo('dashboard')} />;
  if (currentView === 'airtime') return <Airtime onBack={() => navigateTo('dashboard')} />;
  if (currentView === 'data') return <Data onBack={() => navigateTo('dashboard')} />;
  if (currentView === 'support') return <Support onBack={() => navigateTo('dashboard')} />;
  if (currentView === 'earn-more') return <EarnMore onBack={() => navigateTo('dashboard')} />;
  if (currentView === 'profile') return <Profile onBack={() => navigateTo('dashboard')} onNavigate={navigateTo} />;
  if (currentView === 'profile-info') return <ProfileInfo onBack={() => navigateTo('profile')} />;
  if (currentView === 'about') return <About onBack={() => navigateTo('profile')} />;
  if (currentView === 'transaction-history') return <TransactionHistory onBack={() => navigateTo('dashboard')} />;
  if (currentView === 'refer-earn') return <ReferEarn onBack={() => navigateTo('dashboard')} onNavigate={navigateTo} />;
  if (currentView === 'upgrade') return <Upgrade onBack={() => navigateTo('dashboard')} />;
  if (currentView === 'join-communities') return <JoinCommunities onBack={() => navigateTo('dashboard')} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100">
      {showOnboardingPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <Onboarding onComplete={handleCompleteOnboarding} />
          </div>
        </div>
      )}

      <div className="bg-white p-3 overflow-hidden border-b">
        <div className="animate-slide-banner whitespace-nowrap text-red-500">
          Dear user we're currently having issues with OPay bank kindly use another bank for your payment of pay Id
        </div>
      </div>

      <DashboardHeader
        balanceVisible={balanceVisible}
        setBalanceVisible={setBalanceVisible}
        onTransactionHistory={() => navigateTo('transaction-history')}
        onLogout={handleLogout}
        onUpgrade={() => navigateTo('upgrade')}
        onTransfer={() => navigateTo('transfer')}
      />

      <div className="p-6">
        <QuickActions onNavigate={navigateTo} />
        <PromotionsCarousel setApi={setApi} />
      </div>

      <LogoutDialog
        isOpen={showLogoutDialog}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />

      {showReferPopup && <ReferEarnPopup onClose={hideReferPopup} />}
    </div>
  );
};

export default Dashboard;
