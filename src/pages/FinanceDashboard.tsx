import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Download, 
  Plus,
  Building2,
  CreditCard,
  Receipt,
  BarChart3
} from "lucide-react"
import { toast } from "sonner"

export default function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const mockInvoices = [
    { id: 1, patient: "John Doe", amount: 150, date: "2024-01-15", status: "paid", service: "Physical Therapy" },
    { id: 2, patient: "Jane Smith", amount: 200, date: "2024-01-14", status: "pending", service: "Speech Therapy" },
    { id: 3, patient: "Bob Johnson", amount: 175, date: "2024-01-13", status: "overdue", service: "Occupational Therapy" },
    { id: 4, patient: "Alice Brown", amount: 125, date: "2024-01-12", status: "paid", service: "Consultation" }
  ]

  const mockExpenses = [
    { id: 1, description: "Medical Equipment", amount: 2500, date: "2024-01-10", category: "Equipment" },
    { id: 2, description: "Staff Salaries", amount: 15000, date: "2024-01-01", category: "Payroll" },
    { id: 3, description: "Office Supplies", amount: 350, date: "2024-01-08", category: "Supplies" },
    { id: 4, description: "Utility Bills", amount: 800, date: "2024-01-05", category: "Utilities" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success text-success-foreground"
      case "pending":
        return "bg-warning text-warning-foreground"
      case "overdue":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const totalRevenue = mockInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const netIncome = totalRevenue - totalExpenses

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">OTWare Finance</h1>
            </Link>
            <div className="flex items-center gap-2">
              <Badge className="bg-warning text-warning-foreground">Finance Manager</Badge>
              <Button variant="outline" onClick={() => toast.success("Report generated!")}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button onClick={() => toast.success("Invoice created!")}>
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Financial Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">-5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-success' : 'text-destructive'}`}>
                ${netIncome.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Current month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <FileText className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                ${mockInvoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Pending payments</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Recent Invoices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockInvoices.slice(0, 3).map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{invoice.patient}</h4>
                          <p className="text-sm text-muted-foreground">{invoice.service}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${invoice.amount}</div>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Recent Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockExpenses.slice(0, 3).map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{expense.description}</h4>
                          <p className="text-sm text-muted-foreground">{expense.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-destructive">-${expense.amount}</div>
                          <div className="text-xs text-muted-foreground">{expense.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Financial Summary
                </CardTitle>
                <CardDescription>Monthly financial performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Financial charts and analytics would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices */}
          <TabsContent value="invoices" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Invoices</h2>
              <Button onClick={() => toast.success("New invoice created!")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>

            <div className="grid gap-4">
              {mockInvoices.map((invoice) => (
                <Card key={invoice.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{invoice.patient}</h3>
                        <p className="text-sm text-muted-foreground">
                          {invoice.service} • {invoice.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-lg">${invoice.amount}</div>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Expenses */}
          <TabsContent value="expenses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Expenses</h2>
              <Button onClick={() => toast.success("Expense recorded!")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>

            <div className="grid gap-4">
              {mockExpenses.map((expense) => (
                <Card key={expense.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                        <Receipt className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{expense.description}</h3>
                        <p className="text-sm text-muted-foreground">
                          {expense.category} • {expense.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-lg text-destructive">-${expense.amount}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}