import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <main className="relative min-h-screen bg-neural-surface overflow-hidden">
      <Navbar />
      {/* Main content area */}
      <div className="md:pl-20 pt-20">
        <Hero />
      </div>
    </main>
  )
}

export default page