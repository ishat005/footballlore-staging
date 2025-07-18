"use client"

import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Stories from "./pages/Stories"
import StoryDetail from "./pages/StoryDetail"
import BoostStatus from "./pages/BoostStatus"
import SubmitStory from "./pages/SubmitStory"
import ProDashboard from "./pages/ProDashboard"
import { UserProvider } from "./context/UserContext"

function App() {
  // Demo user setup for preview
  useEffect(() => {
    const demoUser = {
      email: "demo@footballlore.com",
      voteCredits: 3,
      isPro: false,
    }
    // Set demo user in localStorage for preview
    localStorage.setItem("footballlore_user", JSON.stringify(demoUser))
  }, [])

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50 pitch-lines">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/boost-status" element={<BoostStatus />} />
            <Route path="/submit-story" element={<SubmitStory />} />
            <Route path="/pro-dashboard" element={<ProDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserProvider>
  )
}

export default App
