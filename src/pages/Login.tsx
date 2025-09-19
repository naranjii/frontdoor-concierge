import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link, useNavigate } from "react-router-dom"
import { Building2, LogIn } from "lucide-react"
import { toast } from "sonner"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password || !role) {
      toast.error("Please fill in all fields")
      return
    }

    toast.success(`Logged in as ${role}`)
    
    switch (role) {
      case "ADMIN":
        navigate("/admin")
        break
      case "FINANCE":
        navigate("/finance")
        break
      case "COORDINATOR":
        navigate("/coordinator")
        break
      case "THERAPIST":
        navigate("/therapist")
        break
      case "RECEPTIONIST":
        navigate("/receptionist")
        break
      default:
        navigate("/receptionist")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome to Frontdoor</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-medium">
          <CardHeader>
            <CardTitle>Staff Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the healthcare administration platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Administrator</SelectItem>
                    <SelectItem value="RECEPTIONIST">Receptionist</SelectItem>
                    <SelectItem value="COORDINATOR">Coordinator</SelectItem>
                    <SelectItem value="THERAPIST">Therapist</SelectItem>
                    <SelectItem value="FINANCE">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need help? Contact your system administrator
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Button variant="ghost" asChild>
            <Link to="/">← Back to Homepage</Link>
          </Button>
        </div>
        
        <div className="mt-4 text-center text-xs text-muted-foreground">
          © 2024 OTWare. All rights reserved.
        </div>
      </div>
    </div>
  )
}