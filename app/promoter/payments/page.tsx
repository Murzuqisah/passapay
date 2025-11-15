'use client'

import DashboardSidebar from '../../components/DashboardSidebar'
import ContractPayment from '../../components/promoter/contract-payment'

export default function PaymentsPage() {
  return (
    <DashboardSidebar userType="promoter">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Send Payments</h1>
          <p className="text-muted-foreground">Send payments to artists via smart contract</p>
        </div>
        <ContractPayment />
      </div>
    </DashboardSidebar>
  )
}