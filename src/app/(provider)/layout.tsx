import AdminMainLayout from '@/components/layouts/ProviderLayouWrapper'
import { SidebarProvider } from '@/components/ui/sidebar'
import React, { Suspense } from 'react'

const ProviderLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <Suspense fallback={<div>Admin Layout suspent</div>}>
      <SidebarProvider>
        <AdminMainLayout>{children}</AdminMainLayout>
      </SidebarProvider>
    </Suspense>
  )
}

export default ProviderLayout