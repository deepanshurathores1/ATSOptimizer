"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon, FileText, BarChart, Settings, Bell, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResumeBuilder } from "@/components/ui/ResumeBuilder";
import { ResumeAnalyzer } from "@/components/ui/resumeAnalyzer";
import Nav2 from "@/components/marketing/Nav2";
import Footer from "@/components/marketing/footer";
import { Spotlight } from "@/components/ui/spotlight-new"; // Import the Spotlight component

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "dark");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchUserData(token);
    }
  }, [router]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  if (!user) return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Spotlight Background */}
      <Spotlight />

      <Nav2 />
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-8 relative z-10">
            <div className="max-w-8xl mx-auto space-y-8"> {/* Increased width to max-w-8xl */}
              {/* Welcome Section */}
              <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  Here's an overview of your resume progress
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-secondary/50 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/50 backdrop-blur-sm border border-gray-800/50 hover:border-purple-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">78%</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/50 backdrop-blur-sm border border-gray-800/50 hover:border-green-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">92%</div>
                    <p className="text-xs text-muted-foreground">Achieved this month</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/50 backdrop-blur-sm border border-gray-800/50 hover:border-yellow-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">2d ago</div>
                    <p className="text-xs text-muted-foreground">Last resume update</p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs for Resume Builder and Analyzer */}
              <Tabs defaultValue="builder" className="space-y-6">
                <TabsList className="bg-secondary/50 backdrop-blur-sm border border-gray-800/50">
                  <TabsTrigger value="builder" className="hover:bg-gray-800/50">
                    Resume Builder
                  </TabsTrigger>
                  <TabsTrigger value="analyzer" className="hover:bg-gray-800/50">
                    Resume Analyzer
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="builder" className="space-y-6">
                  <Card className="bg-secondary/50 backdrop-blur-sm border border-gray-800/50">
                    <CardContent className="p-8"> {/* Increased padding */}
                      <ResumeBuilder />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="analyzer" className="space-y-6">
                  <Card className="bg-secondary/50 backdrop-blur-sm border border-gray-800/50">
                    <CardContent className="p-8"> {/* Increased padding */}
                      <ResumeAnalyzer />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}




