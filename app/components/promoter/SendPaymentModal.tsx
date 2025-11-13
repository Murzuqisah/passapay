'use client'

import { useState } from 'react'

interface SendPaymentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SendPaymentModal({ isOpen, onClose }: SendPaymentModalProps) {
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('confirm')
  }

  const handleConfirm = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setStep('success')
  }

  const handleClose = () => {
    setStep('form')
    setRecipient('')
    setAmount('')
    setMemo('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-background rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border-2 border-border shadow-2xl">
        {/* Form Step */}
        {step === 'form' && (
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Send Payment</h2>
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <span className="icon-[mdi--close] text-2xl text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Recipient */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Recipient
                </label>
                <div className="relative">
                  <span className="icon-[mdi--account] absolute left-3 top-1/2 -translate-y-1/2 text-xl text-foreground/60" />
                  <input
                    type="text"
                    placeholder="Artist name or wallet address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-muted/50 border-2 border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-foreground/60 font-bold">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-20 py-3 bg-muted/50 border-2 border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                    step="0.01"
                    min="0"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-foreground/60">
                    USDC
                  </span>
                </div>
              </div>

              {/* Memo */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Memo (Optional)
                </label>
                <textarea
                  placeholder="Add a note for this payment..."
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-muted/50 border-2 border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 resize-none"
                />
              </div>

              {/* Fee Info */}
              <div className="bg-muted/50 rounded-xl p-4 border-2 border-border">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-foreground/70 font-medium">Network Fee</span>
                  <span className="text-foreground font-bold">~0.01 DOT</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground/70 font-medium">Total</span>
                  <span className="text-foreground font-bold text-lg">
                    ${amount || '0.00'} USDC
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] flex items-center justify-center gap-2 border-2 border-primary/20"
              >
                <span>Review Payment</span>
                <span className="icon-[mdi--arrow-right] text-xl" />
              </button>
            </form>
          </div>
        )}

        {/* Confirm Step */}
        {step === 'confirm' && (
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="icon-[mdi--check-circle] text-4xl text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Confirm Payment</h2>
              <p className="text-sm text-muted-foreground">
                Please review the details before sending
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-muted/50 rounded-xl p-4 border-2 border-border">
                <p className="text-xs text-foreground/70 font-bold mb-1">Recipient</p>
                <p className="text-foreground font-bold">{recipient}</p>
              </div>
              
              <div className="bg-muted/50 rounded-xl p-4 border-2 border-border">
                <p className="text-xs text-foreground/70 font-bold mb-1">Amount</p>
                <p className="text-2xl font-bold gradient-text">${amount} USDC</p>
              </div>

              {memo && (
                <div className="bg-muted/50 rounded-xl p-4 border-2 border-border">
                  <p className="text-xs text-foreground/70 font-bold mb-1">Memo</p>
                  <p className="text-foreground text-sm font-medium">{memo}</p>
                </div>
              )}

              <div className="bg-muted/50 rounded-xl p-4 border-2 border-border">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground/70 font-medium">Network Fee</span>
                  <span className="text-foreground font-bold">~0.01 DOT</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground text-lg">${amount} USDC</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('form')}
                className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-bold py-4 px-6 rounded-xl transition-all duration-200 border-2 border-border hover:border-border/80"
                disabled={isProcessing}
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 border-2 border-primary/20"
              >
                {isProcessing ? (
                  <>
                    <span className="icon-[mdi--loading] animate-spin text-xl" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Send</span>
                    <span className="icon-[mdi--send] text-xl" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="p-6 md:p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-in">
              <span className="icon-[mdi--check-circle] text-5xl text-primary" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Sent!</h2>
            <p className="text-muted-foreground mb-6">
              Your payment of ${amount} USDC has been successfully sent to {recipient}
            </p>

            <div className="bg-muted/50 rounded-xl p-4 border-2 border-border mb-6">
              <p className="text-xs text-foreground/70 font-bold mb-2">Transaction Hash</p>
              <p className="text-sm font-mono text-foreground font-medium break-all">
                0x1234567890abcdef1234567890abcdef12345678
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-bold py-4 px-6 rounded-xl transition-all duration-200 border-2 border-border hover:border-border/80"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setStep('form')
                  setRecipient('')
                  setAmount('')
                  setMemo('')
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] border-2 border-primary/20"
              >
                Send Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
