
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  balance?: number;
  referralBalance?: number;
  totalReferrals?: number;
}

interface Transaction {
  type: string;
  amount: number;
  network?: string;
  phoneNumber?: string;
  plan?: any;
  date: string;
  recipientName?: string;
  bankName?: string;
  direction?: 'credit' | 'debit';
  reference?: string;
  status?: string;
}

interface AuthContextType {
  user: User | null;
  transactions: Transaction[];
  isInitializing: boolean;
  showCelebration: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isOnboardingComplete: boolean;
  isWelcomeComplete: boolean;
  showReferPopup: boolean;
  completeOnboarding: () => void;
  completeWelcome: () => void;
  hideReferPopup: () => void;
  hideCelebration: () => void;
  updateBalance: (amount: number) => void;
  updateReferralBalance: (amount: number) => void;
  addReferral: () => void;
  addReferralToBalance: (amount: number) => boolean;
  addTransaction: (transaction: Transaction) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const generateReference = () => 'PG' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 900 + 100);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);
  const [showReferPopup, setShowReferPopup] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  // Auto-login on app load with a small dynamic loading window
  useEffect(() => {
    const start = Date.now();
    const lastLoggedInUser = localStorage.getItem('paygo_current_user');
    if (lastLoggedInUser) {
      const existingUsers = JSON.parse(localStorage.getItem('paygo_users') || '[]');
      const userData = existingUsers.find((u: User) => u.email === lastLoggedInUser);

      if (userData) {
        setUser({
          ...userData,
          balance: userData.balance ?? 180000,
          referralBalance: userData.referralBalance ?? 0,
          totalReferrals: userData.totalReferrals ?? 0
        });
        const userTransactions = JSON.parse(localStorage.getItem(`paygo_transactions_${lastLoggedInUser}`) || '[]');
        setTransactions(userTransactions);
        setIsWelcomeComplete(true);
        setIsOnboardingComplete(true);
        setShowReferPopup(true);
      }
    }
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, 1200 - elapsed);
    const t = setTimeout(() => setIsInitializing(false), remaining);
    return () => clearTimeout(t);
  }, []);

  const persistUser = (updated: User) => {
    const existingUsers = JSON.parse(localStorage.getItem('paygo_users') || '[]');
    const userIndex = existingUsers.findIndex((u: User) => u.email === updated.email);
    if (userIndex !== -1) {
      existingUsers[userIndex] = updated;
      localStorage.setItem('paygo_users', JSON.stringify(existingUsers));
    }
  };

  const register = (name: string, email: string, password: string) => {
    const existingUsers = JSON.parse(localStorage.getItem('paygo_users') || '[]');
    const emailExists = existingUsers.some((u: User) => u.email === email);

    if (emailExists) {
      return { success: false, error: 'Email already exists, please login' };
    }

    const newUser: User = {
      name,
      email,
      balance: 180000,
      referralBalance: 0,
      totalReferrals: 0
    };
    existingUsers.push(newUser);
    localStorage.setItem('paygo_users', JSON.stringify(existingUsers));

    // Record welcome bonus receipt
    const welcomeTx: Transaction = {
      type: 'Welcome Bonus',
      amount: 180000,
      direction: 'credit',
      status: 'Successful',
      reference: generateReference(),
      date: new Date().toISOString()
    };
    localStorage.setItem(`paygo_transactions_${email}`, JSON.stringify([welcomeTx]));

    setUser(newUser);
    setTransactions([welcomeTx]);
    setIsWelcomeComplete(false);
    setIsOnboardingComplete(false);
    setShowCelebration(true);
    localStorage.setItem('paygo_current_user', email);
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const existingUsers = JSON.parse(localStorage.getItem('paygo_users') || '[]');
    const userData = existingUsers.find((u: User) => u.email === email);

    if (userData) {
      setUser({
        ...userData,
        balance: userData.balance ?? 180000,
        referralBalance: userData.referralBalance ?? 0,
        totalReferrals: userData.totalReferrals ?? 0
      });
      const userTransactions = JSON.parse(localStorage.getItem(`paygo_transactions_${email}`) || '[]');
      setTransactions(userTransactions);
      setIsWelcomeComplete(true);
      setIsOnboardingComplete(true);
      setShowReferPopup(true);
      localStorage.setItem('paygo_current_user', email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTransactions([]);
    setIsOnboardingComplete(false);
    setIsWelcomeComplete(false);
    setShowReferPopup(false);
    setShowCelebration(false);
    localStorage.removeItem('paygo_current_user');
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    setShowReferPopup(true);
  };

  const hideReferPopup = () => setShowReferPopup(false);
  const completeWelcome = () => setIsWelcomeComplete(true);
  const hideCelebration = () => setShowCelebration(false);

  const updateBalance = (amount: number) => {
    if (!user) return;
    const newBalance = Math.max(0, (user.balance || 0) - amount);
    const updated = { ...user, balance: newBalance };
    setUser(updated);
    persistUser(updated);
  };

  const updateReferralBalance = (amount: number) => {
    if (!user) return;
    const newReferralBalance = Math.max(0, (user.referralBalance || 0) - amount);
    const updated = { ...user, referralBalance: newReferralBalance };
    setUser(updated);
    persistUser(updated);
  };

  const addReferral = () => {
    if (!user) return;
    const updated = {
      ...user,
      referralBalance: (user.referralBalance || 0) + 5000,
      totalReferrals: (user.totalReferrals || 0) + 1
    };
    setUser(updated);
    persistUser(updated);
  };

  const addReferralToBalance = (amount: number) => {
    if (!user) return false;
    if (amount <= 0 || amount > (user.referralBalance || 0)) return false;
    const updated = {
      ...user,
      referralBalance: (user.referralBalance || 0) - amount,
      balance: (user.balance || 0) + amount
    };
    setUser(updated);
    persistUser(updated);
    addTransaction({
      type: 'Referral Bonus to Balance',
      amount,
      direction: 'credit',
      status: 'Successful',
      reference: generateReference(),
      date: new Date().toISOString()
    });
    return true;
  };

  const addTransaction = (transaction: Transaction) => {
    if (!user) return;
    const tx = {
      direction: 'debit' as const,
      status: 'Successful',
      reference: generateReference(),
      ...transaction
    };
    const newTransactions = [tx, ...transactions];
    setTransactions(newTransactions);
    localStorage.setItem(`paygo_transactions_${user.email}`, JSON.stringify(newTransactions));
  };

  return (
    <AuthContext.Provider value={{
      user,
      transactions,
      isInitializing,
      showCelebration,
      login,
      register,
      logout,
      isOnboardingComplete,
      isWelcomeComplete,
      showReferPopup,
      completeOnboarding,
      completeWelcome,
      hideReferPopup,
      hideCelebration,
      updateBalance,
      updateReferralBalance,
      addReferral,
      addReferralToBalance,
      addTransaction
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
