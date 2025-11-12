'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { useConnect } from '../hooks/use-connect'
import { stripAddress } from '../utils/formatters'

interface ConnectProps {
  showText?: boolean
}

export default function Connect({ showText = true }: ConnectProps) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [showOtherWallets, setShowOtherWallets] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const {
    listAccounts,
    selectedAccount,
    connectedWallet,
    isConnecting,
    installedWallets,
    availableWallets,
    connect,
    selectAccount,
    disconnect,
  } = useConnect()

  function handleSelectAccount(account: typeof selectedAccount) {
    if (account) {
      selectAccount(account)
      setIsModalOpen(false)
    }
  }

  function openConnectModal() {
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function closeConnectModal() {
    setIsModalOpen(false)
    document.body.style.overflow = 'unset'
  }

  function toggleOtherWallets() {
    setShowOtherWallets(!showOtherWallets)
  }

  function isWalletConnected(wallet: typeof connectedWallet) {
    return connectedWallet?.extensionName === wallet?.extensionName
  }

  function isAccountSelected(account: typeof selectedAccount) {
    return selectedAccount?.address === account?.address
  }

  return (
    <>
      {/* Connect/Disconnect Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={showText 
            ? "inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            : "inline-flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          }
          onClick={openConnectModal}
        >
          {!selectedAccount
            ? (
                <>
                  <span className="icon-[mdi--wallet] w-5 h-5" />
                  {showText && <span>Connect Wallet</span>}
                </>
              )
            : (
                <>
                  <span className="icon-[mdi--wallet] w-4 h-4" />
                  {showText && <span className="hidden sm:block">{selectedAccount.name}</span>}
                  <Image
                    src={connectedWallet?.logo.src || ''}
                    alt={connectedWallet?.logo.alt || ''}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </>
              )}
        </button>

        {/* Disconnect Button (only shown when connected) */}
        {selectedAccount
          ? (
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 border border-input bg-background rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={disconnect}
              >
                <span className="icon-[mdi--logout] w-4 h-4" />
              </button>
            )
          : null}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ position: 'fixed' }}>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={closeConnectModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-background border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10">
            <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Connect Wallet
              </h2>
              <button 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors" 
                onClick={closeConnectModal}
              >
                <span className="icon-[mdi--close] w-5 h-5" />
              </button>
            </div>

          {/* Account Selection */}
          {listAccounts.length > 0
            ? (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Select Account
                  </h3>
                  <div className="space-y-2">
                    {listAccounts.map(account => (
                      <div
                        key={account.address}
                        className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all ${
                          isAccountSelected(account)
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary'
                        }`}
                        onClick={() => handleSelectAccount(account)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                              <span className="icon-[mdi--account] text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {account.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {stripAddress(account.address)}
                              </p>
                            </div>
                          </div>
                          {isAccountSelected(account)
                            ? (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )
                            : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            : null}

          {/* Installed */}
          {installedWallets.length > 0
            ? (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Installed
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {installedWallets.map(wallet => (
                      <div
                        key={wallet.installUrl}
                        className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all ${
                          isWalletConnected(wallet)
                            ? 'border-green-500 bg-green-50 dark:bg-green-950'
                            : 'border-border hover:border-primary'
                        }`}
                        onClick={() => connect(wallet)}
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="relative">
                            <Image
                              src={wallet.logo.src}
                              alt={wallet.logo.alt}
                              width={48}
                              height={48}
                              className="w-12 h-12"
                            />
                            {isWalletConnected(wallet)
                              ? (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="icon-[mdi--check] w-2 h-2 text-white" />
                                  </div>
                                )
                              : null}
                          </div>
                          <div className="text-sm font-medium">
                            {wallet.title}
                          </div>
                          <button
                            type="button"
                            disabled={isConnecting === wallet.extensionName}
                            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors w-full"
                          >
                            {isConnecting === wallet.extensionName
                              ? (
                                  <span className="icon-[mdi--loading] animate-spin" />
                                )
                              : null}
                            {isWalletConnected(wallet)
                              ? (
                                  'Connected'
                                )
                              : isConnecting === wallet.extensionName
                                ? (
                                    'Connecting'
                                  )
                                : (
                                    'Connect'
                                  )}
                            {!isWalletConnected(wallet)
                              ? (
                                  <span className="icon-[mdi--chevron-right]" />
                                )
                              : null}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            : null}

          {/* Other Wallets */}
          {availableWallets.length > 0
            ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Other wallets
                    </h3>
                    <button type="button" className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={toggleOtherWallets}>
                      {showOtherWallets ? 'Hide' : 'Show'}
                      <span
                        className={showOtherWallets ? 'icon-[mdi--chevron-up]' : 'icon-[mdi--chevron-down]'}
                      />
                    </button>
                  </div>
                  {showOtherWallets
                    ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                          {availableWallets.map(wallet => (
                            <div
                              key={wallet.installUrl}
                              className="p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all opacity-60"
                            >
                              <div className="flex flex-col items-center text-center space-y-3">
                                <Image
                                  src={wallet.logo.src}
                                  alt={wallet.logo.alt}
                                  width={48}
                                  height={48}
                                  className="w-12 h-12"
                                />
                                <div className="text-sm font-medium">
                                  {wallet.title}
                                </div>
                                <a
                                  href={wallet.installUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors w-full inline-flex items-center justify-center gap-2"
                                >
                                  <span>Download</span>
                                  <span className="icon-[mdi--download]" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    : null}
                </div>
              )
            : null}
            </div>
          </div>
        </div>
      )}
      
      {/* Hidden dialog for ref management */}
      <dialog ref={modalRef} className="hidden" />
    </>
  )
}
