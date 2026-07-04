import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, Trash2, Receipt, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const TransactionHistory = ({ onBack }: { onBack: () => void }) => {
  const { transactions } = useAuth();
  const [receipt, setReceipt] = useState<any | null>(null);

  const formatDate = (d: string) => {
    try {
      const date = new Date(d);
      if (isNaN(date.getTime())) return d;
      return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
    } catch {
      return d;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button onClick={onBack} className="bg-transparent p-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold">Transaction History</h1>
          </div>
          <Button className="bg-transparent text-red-200 hover:bg-red-500/20">
            <Trash2 className="w-5 h-5 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Your Transactions</h2>

        <div className="space-y-3">
          {transactions && transactions.length > 0 ? (
            transactions.map((tx, index) => {
              const isCredit = tx.direction === 'credit';
              return (
                <button
                  key={index}
                  onClick={() => setReceipt(tx)}
                  className="w-full text-left bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between hover:shadow-md transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCredit ? 'bg-green-100' : 'bg-red-100'}`}>
                      {isCredit ? (
                        <ArrowDownLeft className="w-6 h-6 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{tx.type}</h3>
                      <p className="text-gray-500 text-xs">{formatDate(tx.date)}</p>
                      {tx.network && (
                        <p className="text-gray-500 text-xs">{tx.network} - {tx.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold text-base ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
                      {isCredit ? '+' : '-'}₦{Number(tx.amount).toLocaleString()}.00
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">Tap for receipt</p>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <p>No transactions found</p>
            </div>
          )}
        </div>
      </div>

      {receipt && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                <h3 className="font-bold text-lg">Transaction Receipt</h3>
              </div>
              <button onClick={() => setReceipt(null)} className="p-1 hover:bg-white/20 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="text-center mb-4">
                <p className="text-gray-500 text-sm">{receipt.direction === 'credit' ? 'Amount Received' : 'Amount Paid'}</p>
                <p className={`text-3xl font-black ${receipt.direction === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                  {receipt.direction === 'credit' ? '+' : '-'}₦{Number(receipt.amount).toLocaleString()}.00
                </p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  {receipt.status || 'Successful'}
                </span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4 space-y-3 text-sm">
                <Row label="Transaction Type" value={receipt.type} />
                {receipt.recipientName && <Row label="Recipient" value={receipt.recipientName} />}
                {receipt.bankName && <Row label="Bank" value={receipt.bankName} />}
                {receipt.network && <Row label="Network" value={receipt.network} />}
                {receipt.phoneNumber && <Row label="Phone" value={receipt.phoneNumber} />}
                {receipt.reference && <Row label="Reference" value={receipt.reference} mono />}
                <Row label="Date" value={formatDate(receipt.date)} />
              </div>

              <Button
                onClick={() => setReceipt(null)}
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Row = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-500">{label}</span>
    <span className={`font-semibold text-gray-800 text-right ${mono ? 'font-mono text-xs' : ''}`}>{value}</span>
  </div>
);

export default TransactionHistory;
