import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BuyPayId = ({
  onBack
}: {
  onBack: () => void;
}) => {
  const {
    user
  } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [countdown, setCountdown] = useState(10);
  const [progress, setProgress] = useState(0);
  const [showServiceNotice, setShowServiceNotice] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || ''
  });

  // Countdown for step 2
  useEffect(() => {
    if (currentStep === 2 && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        setProgress((10 - countdown + 1) / 10 * 100);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentStep === 2 && countdown === 0) {
      setShowServiceNotice(true);
    }
  }, [currentStep, countdown]);

  // Auto-redirect for step 4 with proper countdown
  useEffect(() => {
    if (currentStep === 4) {
      let countdownTimer = 10;
      const timer = setInterval(() => {
        countdownTimer--;
        setProgress((10 - countdownTimer) / 10 * 100);
        if (countdownTimer <= 0) {
          clearInterval(timer);
          setCurrentStep(5);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep]);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const handleServiceNoticeClose = () => {
    setShowServiceNotice(false);
    setCurrentStep(3);
  };
  const renderServiceNotice = () => <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h3 className="text-lg font-bold">Service Notice</h3>
          </div>
          <Button onClick={handleServiceNoticeClose} className="bg-transparent p-1">
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
        
        <div className="border-l-4 border-green-400 p-4 mb-4 bg-green-50">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-green-600">✓</span>
            <h4 className="font-bold text-green-600">Opay Bank Service is Working Perfectly</h4>
          </div>
          <p className="text-sm text-green-600">All Opay bank transfers are now working normally. You can proceed with your payment safely.</p>
        </div>
        
        <p className="text-gray-600 text-sm mb-6">We appreciate your patience. All banks including Opay are now working normally and your payment will be processed immediately.</p>
        
        <Button onClick={handleServiceNoticeClose} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg">
          I Understand
        </Button>
      </div>
    </div>;
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Amount</label>
              <div className="bg-gray-100 p-4 rounded-lg">
                <span className="text-2xl font-bold">₦7,250</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Full Name</label>
              <input type="text" placeholder="Your full name" value={formData.fullName} onChange={e => setFormData({
              ...formData,
              fullName: e.target.value
            })} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Your Email Address</label>
              <input type="email" placeholder="email address" value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <Button onClick={() => setCurrentStep(2)} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg">
              Pay
            </Button>

            <p className="text-center text-gray-600 text-sm">
              Your PAY ID will be displayed on the app once your payment is confirmed.
            </p>
          </div>;
      case 2:
        return <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-2xl font-bold text-gray-800">Preparing Payment Account</h3>
            <p className="text-gray-600">Please wait while we set up your payment...</p>
            <div className="text-3xl font-bold text-purple-600">{countdown}</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full transition-all duration-1000" style={{
              width: `${progress}%`
            }}></div>
            </div>
          </div>;
      case 3:
        return <div className="min-h-screen bg-gray-50">
            <div className="p-6 space-y-6">
              <div className="text-center bg-amber-400">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Complete Payment</h2>
                <p className="text-gray-600 text-sm">Transfer ₦7,250 to the account below</p>
              </div>

              {/* Email Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-medium text-sm">Email:</span>
                  <span className="text-blue-800 text-sm">financial1240@gmail.com</span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Amount</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-bold text-gray-900">₦7,250</span>
                    <Button onClick={() => handleCopy('7250')} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md">
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Bank Name</span>
                  <span className="text-xl font-bold text-gray-900">MONIEPOINT MFB</span>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Account Number</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-bold text-gray-900">0046149797</span>
                    <Button onClick={() => handleCopy('0046149797')} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md">
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Account Name</span>
                  <span className="text-xl font-bold text-gray-900">PayGo-MOHAMMED YUSUF</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm text-center">
                  Make transfer and click "I have completed payment" below
                </p>
              </div>

              {/* Complete Payment Button */}
              <Button onClick={() => setCurrentStep(4)} className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg rounded-lg font-medium">
                I have completed payment
              </Button>
            </div>
          </div>;
      case 4:
        return <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-2xl font-bold text-gray-800">Confirming Your Payment</h3>
            <p className="text-gray-600">Please wait while we verify your transaction...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all duration-1000" style={{
              width: `${progress}%`
            }}></div>
            </div>
            <p className="text-sm text-gray-500">This may take a few moments</p>
            <p className="text-sm text-gray-500">Please do not close this page</p>
          </div>;
      case 5:
        return <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-4xl">×</span>
            </div>
            <h3 className="text-2xl font-bold text-orange-500">Transaction verification failed!</h3>
            <div className="text-center">
              <p className="text-gray-800">Your payment could not be completed.</p>
              <p className="text-gray-600">Reason: No Payment received from you/ invalid payment method.</p>
            </div>
            
            <div className="w-full border border-gray-300 rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-600">••••••••••••</span>
              <Button className="bg-transparent border-none p-0">
                <span className="text-gray-400">👁</span>
              </Button>
            </div>

            <div className="w-full space-y-3">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg">
                Try Again
              </Button>
              <Button onClick={onBack} className="w-full bg-transparent border border-gray-300 text-gray-700 py-4 text-lg rounded-lg hover:bg-gray-50">
                Go to Dashboard
              </Button>
            </div>
          </div>;
      default:
        return null;
    }
  };
  if (currentStep === 3) {
    return renderStep();
  }
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Buy PAY ID</h1>
        </div>
      </div>

      <div className="p-6">
        {renderStep()}
      </div>

      {showServiceNotice && renderServiceNotice()}
    </div>;
};

export default BuyPayId;
