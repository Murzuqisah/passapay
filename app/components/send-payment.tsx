'use client'

import { useState } from 'react'
import { useConnect } from '../hooks/use-connect'
import { useUSDCTransaction } from '../hooks/use-usdc-transaction'

export default function SendPayment() {
  const { selectedAccount } = useConnect()
  const { isProcessing, result, sendUSDC } = useUSDCTransaction()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSendPayment = async () => {
    if (!selectedAccount || !recipient || !amount) return
    
    await sendUSDC(recipient, amount)
    setShowConfirmation(false)
  }

  const handleConfirm = () => {
    if (recipient && amount) {
      setShowConfirmation(true)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-white border border-gray-200">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Send Payment</h2>
          
          {/* Recipient Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Recipient Wallet Address</span>
            </label>
            <input
              type="text"
              placeholder="Enter artist's wallet address"
              className="input input-bordered w-full"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          {/* Amount Input */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-medium">Amount (USD)</span>
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered w-full pr-16"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                USDC
              </span>
            </div>
          </div>

          {/* Transaction Status */}
          {isProcessing && (
            <div className="alert alert-info mb-4">
              <span className="icon-[mdi--loading] animate-spin" />
              <span>Processing payment...</span>
            </div>
          )}

          {result && (
            <div className={`alert mb-4 ${result.includes('Error') ? 'alert-error' : 'alert-success'}`}>
              {result.includes('Error') ? (
                <span className="icon-[mdi--alert-circle]" />
              ) : (
                <span className="icon-[mdi--check-circle]" />
              )}
              <span>{result}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={handleConfirm}
              disabled={!recipient || !amount || isProcessing}
            >
              Review Payment
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Payment</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Recipient:</span>
                <span className="font-mono text-sm">{recipient.slice(0, 8)}...{recipient.slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">{amount} USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network Fee:</span>
                <span>~0.01 DOT</span>
              </div>
            </div>

            <div className="modal-action">
              <button 
                className="btn btn-ghost"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSendPayment}
                disabled={isProcessing}
              >
                {isProcessing ? 'Sending...' : 'Send Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}