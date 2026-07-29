import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import { getMe } from '@/services/getMe'
import { IUser } from '@/types/user.type'
import React from 'react'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getMe();
  const user : IUser = data.user;
  
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      {children}
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout