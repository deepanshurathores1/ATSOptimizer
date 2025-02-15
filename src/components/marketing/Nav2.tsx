"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Icons from "../global/icons"
import Wrapper from "../global/wrapper"
import { Button } from "../ui/button"
import MobileMenu from "./mobile-menu"
import { ThemeToggle } from "./theme-toggle"
import { UserCircle } from "lucide-react"

const NAV_LINKS = [
  { name: "Home", href: "/dashboards" },
  { name: "Build", href: "/build" },
  { name: "Analyse", href: "/analyse" },
  { name: "FAQ", href: "/faq" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
]

const Nav2 = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUserData(token)
    }
  }, [])

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        localStorage.removeItem("token")
        router.push("/login")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <header className="sticky top-0 w-full h-16 bg-background/80 backdrop-blur-sm z-50">
      <Wrapper className="h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Icons.icon className="w-6" />
              <span className="text-xl font-semibold hidden lg:block">ATSOptimizer</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm font-medium hover:text-blue-500 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right-side Icons & Profile Dropdown */}
          <div className="flex items-center gap-6 relative">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile Dropdown */}
            {user && (
              <div
                className="relative flex items-center cursor-pointer"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <UserCircle className="w-8 h-8 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition" />

                {dropdownOpen && (
                  <div className="absolute left-0 mt-36 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <Button
                      variant="destructive"
                      className="mt-3 w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </Wrapper>
    </header>
  )
}

export default Nav2