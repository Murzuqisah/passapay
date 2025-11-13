'use client'

interface QuickSendButtonProps {
  onClick: () => void
}

export function QuickSendButton({ onClick }: QuickSendButtonProps) {
  return (
    <div className="section-glass rounded-2xl p-6 md:p-8 h-full flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2 border-border/50 hover:border-primary/30" onClick={onClick}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative gradient circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow duration-300">
            <span className="icon-[mdi--send] text-3xl text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Send Payment
          </h3>
          <p className="text-sm text-muted-foreground">
            Quick payment to artists and performers
          </p>
        </div>

        <button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl shadow-primary/40 hover:shadow-primary/60 hover:scale-105 flex items-center justify-center gap-2 border-2 border-primary/20"
        >
          <span className="text-lg">Send Now</span>
          <span className="icon-[mdi--arrow-right] text-2xl" />
        </button>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-foreground/70 font-bold mb-3">Quick Actions</p>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2.5 rounded-lg bg-muted/30 hover:bg-primary/10 border-2 border-border hover:border-primary/50 transition-all duration-200 flex items-center gap-2 text-sm text-foreground font-medium hover:scale-[1.02]">
              <span className="icon-[mdi--account-multiple] text-xl text-primary" />
              <span>Select from contacts</span>
            </button>
            <button className="w-full text-left px-3 py-2.5 rounded-lg bg-muted/30 hover:bg-accent/10 border-2 border-border hover:border-accent/50 transition-all duration-200 flex items-center gap-2 text-sm text-foreground font-medium hover:scale-[1.02]">
              <span className="icon-[mdi--history] text-xl text-accent" />
              <span>Repeat last payment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
