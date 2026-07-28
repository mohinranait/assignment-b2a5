import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {children}
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout