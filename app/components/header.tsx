'use client'

import Connect from './connect'
import Notifications from './notifications'

export default function Header() {
  return (
    <div className="navbar bg-base-100 border-b border-gray-200">
      <div className="container mx-auto flex items-center">
        <div className="navbar-start">
          <div className="flex items-center">
            <span className="icon-[mdi--music] text-2xl text-primary" />
            <span className="text-xl font-bold text-black tracking-wide ml-2">
              PassaPay
            </span>
          </div>
        </div>
        <div className="navbar-end flex items-center gap-2">
          <Notifications />
          <Connect />
        </div>
      </div>
    </div>
  )
}
