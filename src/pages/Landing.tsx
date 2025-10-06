import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  Shield, 
  Clock,
  UserCheck,
  BarChart3,
  Building2,
  Stethoscope
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Landing() {
  const features = [
    {
      icon: UserCheck,
      title: "Digital Reception",
      description: "Streamline patient and guest check-ins with automated registration, visitor labels, and real-time queue management."
    },
    {
      icon: Users,
      title: "Patient Management",
      description: "Secure EMR-lite system for patient records, treatment history, and comprehensive healthcare documentation."
    },
    {
      icon: Calendar,
      title: "Scheduling & Calendar",
      description: "Advanced appointment scheduling for coordinators and therapists with automated queue visibility at reception."
    },
    {
      icon: DollarSign,
      title: "Financial Management",
      description: "Complete billing system with expense tracking, staff payments, service billing, and comprehensive reporting."
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Multi-role dashboards with granular permission control for Admin, Finance, Coordinator, Therapist, and Reception staff."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Real-time insights into patient flow, financial performance, staff productivity, and institutional metrics."
    }
  ]

  const dashboards = [
    { role: "Admin", description: "Complete system control, staff management, and institutional oversight", icon: Building2 },
    { role: "Receptionist", description: "Patient check-ins, guest registration, queue management", icon: UserCheck },
    { role: "Coordinator", description: "Schedule management, therapist assignments, workload distribution", icon: Calendar },
    { role: "Therapist", description: "Personal schedule, patient records, session notes", icon: Stethoscope },
    { role: "Finance", description: "Billing, payments, expenses, financial reporting", icon: DollarSign }
  ]

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Frontdoor</h1>
              <p className="text-xs text-muted-foreground">Healthcare Administration Hub</p>
            </div>
          </div>
          <Button asChild>
            <Link to="/auth">Staff Login</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Complete Healthcare
            <span className="text-transparent bg-gradient-primary bg-clip-text block">
              Administration Solution
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Streamline your health institution with our comprehensive digital platform. 
            From front desk operations to financial management, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything Your Institution Needs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform scales from small clinics to large multi-role institutions with 
              enterprise-grade security and customizable workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Role-Based Dashboards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each role gets a tailored experience with appropriate permissions and tools 
              for their specific responsibilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboards.map((dashboard, index) => (
              <Card key={index} className="border-border/50 shadow-soft">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <dashboard.icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <CardTitle>{dashboard.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {dashboard.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join healthcare institutions worldwide who trust Frontdoor for their 
            daily operations and long-term growth.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/auth">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card p-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Frontdoor</h3>
                <p className="text-xs text-muted-foreground">by OTWare</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 OTWare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}