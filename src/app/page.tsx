import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <main className="relative min-h-screen bg-neural-surface overflow-hidden">
      <Navbar />
      <Sidebar />
      {/* Main content area */}
      <div className="pt-20 pl-20">
        {/* main content goes here */}
      </div>
    </main>
  )
}

export default page