
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Transfer = ({ onBack }: { onBack: () => void }) => {
  const { user, updateBalance, addTransaction } = useAuth();
  const [amount, setAmount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('Access Bank');
  const [paygoId, setPaygoId] = useState('');
  const [showProcessing, setShowProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [showPaygoId, setShowPaygoId] = useState(false);

  const nigerianBanks = [
    'Access Bank', 'Guaranty Trust Bank', 'Zenith Bank', 'First Bank of Nigeria', 'United Bank for Africa', 
    'Fidelity Bank', 'Union Bank of Nigeria', 'Sterling Bank', 'Stanbic IBTC Bank', 'Polaris Bank',
    'Wema Bank', 'Ecobank Nigeria', 'Heritage Bank', 'Keystone Bank', 'Unity Bank', 'Providus Bank',
    'Citibank Nigeria', 'Standard Chartered Bank', 'SunTrust Bank', 'Titan Trust Bank', 'FCMB',
    'Globus Bank', 'Premium Trust Bank', 'Parallex Bank', 'Taj Bank', 'Jaiz Bank', 'Lotus Bank',
    'Coronation Bank', 'Optimus Bank', 'Signature Bank', 'Peace Microfinance Bank', 'Kuda Bank',
    'Rubies Bank', 'VFD Microfinance Bank', 'Eyowo', 'Carbon', 'ALAT by WEMA', 'Mintyn Bank',
    'Sparkle Microfinance Bank', 'Renmoney MfB', 'Credit Direct MfB', 'FairMoney MfB', 'Page MfB',
    'Cellulant', 'TeamApt', 'Flutterwave', 'Paystack', 'Interswitch', 'OPay', 'PalmPay', 'MTN MoMo',
    'Airtel Money', 'Glo Mobile Money', '9mobile Money', 'FirstMonie', 'Paga', 'Quickteller',
    'Zenith Easy Wallet', 'GTBank 737', 'Access Mobile', 'UBA Mobile', 'First Mobile', 'Ecobank Mobile',
    'FCMB Mobile', 'Heritage Mobile', 'Union Mobile', 'Sterling One Bank', 'Fidelity Mobile',
    'Stanbic Mobile', 'Wema Mobile', 'Unity Mobile', 'Keystone Mobile', 'Polaris Mobile',
    'Standard Chartered Mobile', 'Citibank Mobile', 'SunTrust Mobile', 'Providus Mobile', 'ALAT Digital',
    'Kuda Microfinance Bank', 'Mint Finex MFB', 'Sparkle Microfinance Bank', 'AB Microfinance Bank',
    'ACCION Microfinance Bank', 'Aella Credit', 'Advans La Fayette MfB', 'AgriTech MfB', 'Astrapolaris MfB',
    'Banc Corp Microfinance Bank', 'Baobab Microfinance Bank', 'Boctrust Microfinance Bank', 'BoI MfB',
    'Borderless MfB', 'Branch International Financial Services', 'Carbon MfB', 'CASHBRIDGE MfB',
    'Chikum Microfinance Bank', 'Covenant Microfinance Bank', 'Credite MfB', 'CIT Microfinance Bank',
    'Dot Microfinance Bank', 'Eagle Flight Microfinance Bank', 'Edfin Microfinance Bank', 'Ekondo MfB',
    'Empowerment MfB', 'Enterprise Bank', 'Fairmoney Microfinance Bank', 'Finca Microfinance Bank',
    'Firmus MfB', 'Flourish MfB', 'FSDH Merchant Bank', 'Gateway Mortgage Bank', 'Giordano MfB',
    'GoMoney', 'Goodnews Microfinance Bank', 'Groove MfB', 'Hackman Microfinance Bank', 'Hasal MfB',
    'HighStreet Microfinance Bank', 'Ibile Microfinance Bank', 'Ikoyi Osun MfB', 'Ilaro Poly MfB',
    'Imowo MfB', 'Infinity MfB', 'Intellectual MfB', 'Interland MfB', 'Investo MfB', 'Irese MfB',
    'Iworship MfB', 'Jesam MfB', 'Jubilee Life Mortgage Bank', 'Kadpoly MfB', 'Kcmb MfB', 'Kogi MfB',
    'Kredi Money MfB', 'Lapo Microfinance Bank', 'Lavender MfB', 'Layer MfB', 'Lifegate MfB',
    'Living Trust Mortgage Bank', 'Lovonus MfB', 'Lumina MfB', 'Mayfair MfB', 'Megapraise MfB',
    'Molusi MfB', 'Money Master PSB', 'Moniepoint MfB', 'NewEdge Finance', 'NIRSAL Microfinance Bank',
    'NNEW MfB', 'Nownow Digital Systems', 'NPF Microfinance Bank', 'NYSC Microfinance Bank',
    'Ohafia MfB', 'Okuku MfB', 'Olabisi Onabanjo University MfB', 'Oluyole MfB', 'Omiye MfB',
    'Otuo MfB', 'Paga MfB', 'Parkway - ReadyCash', 'Patrickgold MfB', 'Paycom', 'Peace MfB',
    'Personal Trust MfB', 'Petra MfB', 'PiggyVest', 'Platinum Mortgage Bank', 'Pocredit MfB',
    'Polaris Digitech', 'Prestige Microfinance Bank', 'Purplemoney MfB', 'Quickfund MfB', 'Rand MfB',
    'Refuge Mortgage Bank', 'Relief Microfinance Bank', 'Rephidim MfB', 'Republic Microfinance Bank',
    'Richway MfB', 'Royal Exchange Microfinance Bank', 'Safe Haven MfB', 'SAGE GREY Finance',
    'Shield MfB', 'Solid Allianze MfB', 'Solid Rock MfB', 'Staco Microfinance Bank', 'Stallion MfB',
    'Stellas MfB', 'Supreme MfB', 'TagPay', 'TCF MfB', 'Think Finance MfB', 'Titan Paystack',
    'Trident Microfinance Bank', 'Trust Microfinance Bank', 'U&C Microfinance Bank', 'Unical MfB',
    'Unilag MfB', 'Unizik MfB', 'Uniuyo MfB', 'Valley MfB', 'Virtue MfB', 'VTNetworks',
    'Wetland Microfinance Bank', 'Xslnce MfB', 'Yes MfB'
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showProcessing && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (showProcessing && countdown === 0) {
      // Deduct from main balance
      updateBalance(parseFloat(amount));
      addTransaction({
        type: 'Transfer',
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString() + ' at ' + new Date().toLocaleTimeString(),
        recipientName: accountName,
        bankName: bankName
      });
      setShowProcessing(false);
      setShowReceipt(true);
    }
    return () => clearTimeout(timer);
  }, [showProcessing, countdown, amount, accountName, bankName, updateBalance, addTransaction, onBack]);

  const handleTransfer = () => {
    const transferAmount = parseFloat(amount);
    
    // Validate PayGo ID
    if (paygoId !== 'paygo238') {
      alert('Invalid PayGo ID. Only paygo238 is allowed for transfers.');
      return;
    }

    if (transferAmount > 0 && transferAmount <= (user?.balance || 0) && accountName && accountNumber && paygoId) {
      setCountdown(10);
      setShowProcessing(true);
    }
  };

  if (showReceipt) {
    const currentDate = new Date();
    const transactionRef = `TXN${Date.now().toString().slice(-8)}`;
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold">Transfer Successful</h2>
            <p className="text-green-100 text-sm mt-1">Your money has been sent</p>
          </div>

          {/* Amount Section */}
          <div className="p-6 text-center border-b border-gray-100">
            <p className="text-gray-600 text-sm mb-1">Amount Transferred</p>
            <h1 className="text-3xl font-bold text-gray-800">₦{parseFloat(amount).toLocaleString()}</h1>
          </div>

          {/* Transaction Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Recipient</p>
                <p className="font-semibold text-gray-800">{accountName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Bank</p>
                <p className="font-semibold text-gray-800">{bankName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Account Number</p>
                <p className="font-semibold text-gray-800">{accountNumber}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">PayGo ID</p>
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-gray-800">
                    {showPaygoId ? paygoId : '••••••••'}
                  </p>
                  <button
                    onClick={() => setShowPaygoId(!showPaygoId)}
                    className="text-purple-600 text-sm font-medium"
                  >
                    {showPaygoId ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Transaction Ref</p>
                <p className="font-semibold text-gray-800">{transactionRef}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Date & Time</p>
                <p className="font-semibold text-gray-800">
                  {currentDate.toLocaleDateString()}<br />
                  <span className="text-xs text-gray-600">{currentDate.toLocaleTimeString()}</span>
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className="font-semibold text-green-600 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Completed
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 text-center">
            <p className="text-xs text-gray-500">
              Transaction processed securely by PayGo
            </p>
            <p className="text-xs text-gray-400 mt-1 mb-4">
              Keep this receipt for your records
            </p>
            <Button
              onClick={onBack}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-lg"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-xl font-bold">Processing Transfer...</h3>
          <p className="text-gray-600">Please wait while we process your request</p>
          <div className="text-3xl font-bold text-purple-600">{countdown}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Transfer To Bank</h1>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Bank Details</h2>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Account Number (10 digits)"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {nigerianBanks.map((bank, index) => (
                <option key={index} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="PAY ID CODE (Buy PAY ID)"
              value={paygoId}
              onChange={(e) => setPaygoId(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-purple-600 mt-1">Buy PAY ID code</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-lg font-bold text-gray-800 mb-4">
            Available Balance: ₦{(user?.balance || 0).toLocaleString()}.00
          </p>

          <Button
            onClick={handleTransfer}
            disabled={!amount || !accountName || !accountNumber || !paygoId || parseFloat(amount) > (user?.balance || 0) || paygoId !== 'paygo238'}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg disabled:opacity-50"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
