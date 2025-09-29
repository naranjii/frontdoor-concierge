import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermissions?: string[]
}

export function ProtectedRoute({ 
  children, 
  requiredPermissions = [] 
}: ProtectedRouteProps) {
  const { user, profile, loading, hasPermission } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return <Navigate to="/auth" replace />
  }

  // Check permission requirements
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => hasPermission(permission))
    if (!hasAllPermissions) {
      return <Navigate to="/dashboard" replace />
    }
  }

  return <>{children}</>
}