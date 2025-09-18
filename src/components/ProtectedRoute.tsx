import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  requiredPrivileges?: string[]
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  requiredPrivileges = [] 
}: ProtectedRouteProps) {
  const { user, staff, loading, hasRole, hasPrivilege } = useAuth()

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

  if (!user || !staff) {
    return <Navigate to="/login" replace />
  }

  // Check role requirements
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return <Navigate to="/unauthorized" replace />
  }

  // Check privilege requirements
  if (requiredPrivileges.length > 0) {
    const hasAllPrivileges = requiredPrivileges.every(privilege => hasPrivilege(privilege))
    if (!hasAllPrivileges) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}