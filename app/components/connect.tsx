'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useConnect } from '../hooks/use-connect'
import { useMetaMask } from '../hooks/use-metamask'
import { stripAddress } from '../utils/formatters'

interface ConnectProps {
  showText?: boolean
  onWalletConnected?: () => void
}

interface OnboardingData {
  userType: 'artist' | 'promoter' | ''
  name: string
  email: string
  country: string
  genre?: string
  organization?: string
}

export default function Connect({ showText = true, onWalletConnected }: ConnectProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAllWallets, setShowAllWallets] = useState(false)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    userType: '',
    name: '',
    email: '',
    country: '',
    genre: '',
    organization: ''
  })

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

  const metamask = useMetaMask()

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  async function handleSelectAccount(account: typeof selectedAccount, isMetaMask = false) {
    if (account) {
      if (!isMetaMask) selectAccount(account)

      // Check if user needs onboarding
      try {
        const response = await fetch(`/api/users?walletAddress=${account.address}`)
        const data = await response.json()

        if (data.useLocalStorage) {
          const { userExists, getUserProfile } = await import('../lib/local-storage')
          const exists = userExists(account.address)
          if (!exists) {
            setShowOnboarding(true)
            return
          }
          // User exists, redirect to appropriate dashboard
          const profile = getUserProfile(account.address)
          setIsModalOpen(false)
          if (onWalletConnected) onWalletConnected()
          router.push(profile?.userType === 'artist' ? '/artist' : '/promoter/dashboard')
        } else if (!data.exists) {
          setShowOnboarding(true)
          return
        } else {
          // User exists in database, redirect to appropriate dashboard
          setIsModalOpen(false)
          if (onWalletConnected) onWalletConnected()
          router.push(data.user?.userType === 'artist' ? '/artist' : '/promoter/dashboard')
        }
      } catch {
        setShowOnboarding(true)
      }
    }
  }

  async function handleConnectClick() {
    if (selectedAccount || metamask.account) {
      const address = metamask.account?.address || selectedAccount?.address
      if (!address) return
      // User is already connected, check if they have a profile and redirect
      try {
        const response = await fetch(`/api/users?walletAddress=${address}`)
        const data = await response.json()

        if (data.useLocalStorage) {
          const { userExists, getUserProfile } = await import('../lib/local-storage')
          const exists = userExists(address)
          if (exists) {
            const profile = getUserProfile(address)
            router.push(profile?.userType === 'artist' ? '/artist' : '/promoter/dashboard')
            return
          }
        } else if (data.exists) {
          router.push(data.user?.userType === 'artist' ? '/artist' : '/promoter/dashboard')
          return
        }
      } catch {
        // If error, fall through to open modal
      }
    }

    openModal()
  }

  function openModal() {
    // Scroll to hero section first
    const heroSection = document.querySelector('section')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
      // Wait for scroll to complete before opening modal
      setTimeout(() => {
        setIsModalOpen(true)
      }, 500)
    } else {
      setIsModalOpen(true)
    }
  }

  function closeModal() {
    setIsModalOpen(false)
    setShowOnboarding(false)
    setOnboardingStep(1)
  }

  const handleOnboardingNext = () => {
    if (onboardingStep < 3) setOnboardingStep(onboardingStep + 1)
  }

  const handleOnboardingBack = () => {
    if (onboardingStep > 1) setOnboardingStep(onboardingStep - 1)
  }

  const handleOnboardingSubmit = async () => {
    setIsSubmitting(true)
    try {
      const walletAddress = selectedAccount?.address || metamask.account?.address || ''
      const userData = {
        ...onboardingData,
        userType: onboardingData.userType as 'artist' | 'promoter',
        walletAddress
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      const result = await response.json()

      if (response.ok) {
        if (result.useLocalStorage) {
          const { saveUserProfile } = await import('../lib/local-storage')
          saveUserProfile(userData)
        }
        closeModal()
        router.push(onboardingData.userType === 'artist' ? '/artist' : '/promoter/dashboard')
      } else {
        const { addToQueue } = await import('../lib/sync-queue')
        addToQueue('/api/users', 'POST', userData)
        closeModal()
      }
    } catch {
      const { addToQueue } = await import('../lib/sync-queue')
      const walletAddress = selectedAccount?.address || metamask.account?.address || ''
      const userData = {
        ...onboardingData,
        userType: onboardingData.userType as 'artist' | 'promoter',
        walletAddress
      }
      addToQueue('/api/users', 'POST', userData)

      const { saveUserProfile } = await import('../lib/local-storage')
      saveUserProfile(userData)

      closeModal()
      router.push(onboardingData.userType === 'artist' ? '/artist' : '/promoter/dashboard')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedStep1 = onboardingData.userType !== ''
  const canProceedStep2 = onboardingData.userType === 'artist' ? (onboardingData.name && onboardingData.email && onboardingData.country) : (onboardingData.email && onboardingData.country)
  const canProceedStep3 = onboardingData.userType === 'artist' ? onboardingData.genre : onboardingData.organization

  return (
    <>
      {/* Connect Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={showText
            ? "inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            : "inline-flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          }
          onClick={handleConnectClick}
        >
          {!selectedAccount && !metamask.account ? (
            <>
              <span className="icon-[mdi--wallet] w-5 h-5" />
              {showText && <span>Connect Wallet</span>}
            </>
          ) : (
            <>
              <span className="icon-[mdi--wallet] w-4 h-4" />
              {showText && <span className="hidden sm:block">{metamask.account?.name || selectedAccount?.name}</span>}
              {connectedWallet?.logo && !metamask.account && (
                <Image
                  src={connectedWallet.logo.src}
                  alt={connectedWallet.logo.alt}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              )}
            </>
          )}
        </button>

        {(selectedAccount || metamask.account) && (
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 border border-input bg-background rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => {
              disconnect()
              metamask.disconnect()
            }}
          >
            <span className="icon-[mdi--logout] w-4 h-4" />
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div
            className="relative bg-background border-2 border-border rounded-xl shadow-2xl w-[95vw] sm:w-[600px] lg:w-[700px] max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {showOnboarding ? 'Complete Your Profile' : 'Connect Wallet'}
                </h2>
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors"
                  onClick={closeModal}
                >
                  <span className="icon-[mdi--close] w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps */}
              {showOnboarding && (
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${onboardingStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>1</div>
                    <div className={`w-20 h-1 rounded-full transition-colors ${onboardingStep >= 2 ? 'bg-primary' : 'bg-muted'
                      }`} />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${onboardingStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>2</div>
                    <div className={`w-20 h-1 rounded-full transition-colors ${onboardingStep >= 3 ? 'bg-primary' : 'bg-muted'
                      }`} />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${onboardingStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>3</div>
                  </div>
                </div>
              )}

              {/* Onboarding Steps */}
              {showOnboarding ? (
                <div>
                  {/* Step 1: User Type */}
                  {onboardingStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">I am a...</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          className={`p-6 rounded-lg border-2 transition-all hover:border-primary/50 ${onboardingData.userType === 'artist'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-accent/50'
                            }`}
                          onClick={() => setOnboardingData({ ...onboardingData, userType: 'artist' })}
                        >
                          <div className="text-center space-y-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                              <span className="icon-[mdi--music] text-2xl text-primary" />
                            </div>
                            <h4 className="font-semibold">Artist</h4>
                            <p className="text-sm text-muted-foreground">Receive payments for performances</p>
                          </div>
                        </button>
                        <button
                          className={`p-6 rounded-lg border-2 transition-all hover:border-primary/50 ${onboardingData.userType === 'promoter'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-accent/50'
                            }`}
                          onClick={() => setOnboardingData({ ...onboardingData, userType: 'promoter' })}
                        >
                          <div className="text-center space-y-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                              <span className="icon-[mdi--briefcase] text-2xl text-primary" />
                            </div>
                            <h4 className="font-semibold">Promoter</h4>
                            <p className="text-sm text-muted-foreground">Send payments to artists</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Basic Info */}
                  {onboardingStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Basic Information</h3>
                      <div className="space-y-4">
                        {onboardingData.userType === 'artist' && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              value={onboardingData.name}
                              onChange={(e) => setOnboardingData({ ...onboardingData, name: e.target.value })}
                              placeholder="Enter your full name"
                            />
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <input
                            type="email"
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={onboardingData.email}
                            onChange={(e) => setOnboardingData({ ...onboardingData, email: e.target.value })}
                            placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Country *</label>
                          <select
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={onboardingData.country}
                            onChange={(e) => setOnboardingData({ ...onboardingData, country: e.target.value })}
                          >
                            <option value="">Select country</option>
                            <option value="KE">Kenya</option>
                            <option value="NG">Nigeria</option>
                            <option value="GH">Ghana</option>
                            <option value="ZA">South Africa</option>
                            <option value="UG">Uganda</option>
                            <option value="TZ">Tanzania</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Additional Info */}
                  {onboardingStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">
                        {onboardingData.userType === 'artist' ? 'Artist Details' : 'Organization Details'}
                      </h3>
                      <div className="space-y-4">
                        {onboardingData.userType === 'artist' ? (
                          <div>
                            <label className="block text-sm font-medium mb-2">Genre *</label>
                            <select
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              value={onboardingData.genre}
                              onChange={(e) => setOnboardingData({ ...onboardingData, genre: e.target.value })}
                            >
                              <option value="">Select genre</option>
                              <option value="afrobeats">Afrobeats</option>
                              <option value="hip-hop">Hip Hop</option>
                              <option value="reggae">Reggae</option>
                              <option value="jazz">Jazz</option>
                              <option value="rock">Rock</option>
                              <option value="pop">Pop</option>
                            </select>
                          </div>
                        ) : (
                          <div>
                            <label className="block text-sm font-medium mb-2">Organization Name *</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              value={onboardingData.organization}
                              onChange={(e) => setOnboardingData({ ...onboardingData, organization: e.target.value })}
                              placeholder="Enter organization name"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Onboarding Navigation */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                    {onboardingStep > 1 ? (
                      <button
                        className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={handleOnboardingBack}
                      >
                        Back
                      </button>
                    ) : (
                      <div />
                    )}
                    {onboardingStep < 3 ? (
                      <button
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleOnboardingNext}
                        disabled={
                          (onboardingStep === 1 && !canProceedStep1) ||
                          (onboardingStep === 2 && !canProceedStep2)
                        }
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        onClick={handleOnboardingSubmit}
                        disabled={!canProceedStep3 || isSubmitting}
                      >
                        {isSubmitting && <span className="icon-[mdi--loading] animate-spin" />}
                        {isSubmitting ? 'Creating Profile...' : 'Complete Setup'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  {/* Account Selection */}
                  {listAccounts.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Select Account
                      </h3>
                      <div className="space-y-2">
                        {listAccounts.map(account => (
                          <div
                            key={account.address}
                            className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all hover:border-primary"
                            onClick={() => handleSelectAccount(account)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                                  <span className="icon-[mdi--account] text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{account.name}</p>
                                  <p className="text-xs text-muted-foreground">{stripAddress(account.address)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* MetaMask */}
                  {metamask.isInstalled && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Ethereum Wallet (Moonbeam)
                      </h3>
                      <div
                        className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all hover:border-primary"
                        onClick={async () => {
                          await metamask.connect()
                          if (metamask.account) {
                            handleSelectAccount({ address: metamask.account.address, name: metamask.account.name } as typeof selectedAccount, true)
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                              <span className="text-2xl">🦊</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">MetaMask</p>
                              <p className="text-xs text-muted-foreground">Connect via Moonbeam</p>
                            </div>
                          </div>
                          {metamask.isConnecting && <span className="icon-[mdi--loading] animate-spin" />}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Installed Wallets */}
                  {installedWallets.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Installed Wallets
                        </h3>
                        {installedWallets.length > 3 && (
                          <button
                            type="button"
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                            onClick={() => setShowAllWallets(!showAllWallets)}
                          >
                            {showAllWallets ? 'View Less' : 'View More'}
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {(showAllWallets ? installedWallets : installedWallets.slice(0, 3)).map(wallet => (
                          <div
                            key={wallet.installUrl}
                            className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all hover:border-primary"
                            onClick={() => connect(wallet)}
                          >
                            <div className="flex flex-col items-center text-center space-y-3">
                              <Image
                                src={wallet.logo.src}
                                alt={wallet.logo.alt}
                                width={48}
                                height={48}
                                className="w-12 h-12"
                              />
                              <div className="text-sm font-medium">{wallet.title}</div>
                              <button
                                type="button"
                                disabled={isConnecting === wallet.extensionName}
                                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors w-full"
                              >
                                {isConnecting === wallet.extensionName ? (
                                  <span className="icon-[mdi--loading] animate-spin" />
                                ) : (
                                  'Connect'
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Available Wallets */}
                  {availableWallets.length > 0 && showAllWallets && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Available Wallets
                      </h3>
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
                              <div className="text-sm font-medium">{wallet.title}</div>
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
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}