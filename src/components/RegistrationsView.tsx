import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserPlus, Users } from "lucide-react";
import { PatientRegistrationForm } from "@/components/forms/PatientRegistrationForm";
import { GuestRegistrationForm } from "@/components/forms/GuestRegistrationForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const RegistrationsView = () => {
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Patient & Guest Registration</h2>
          <p className="text-muted-foreground">Register new patients or guests</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient Registration Card */}
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>Patient Registration</CardTitle>
                <CardDescription>Add a new patient to the system</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => setIsAddPatientOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register New Patient
            </Button>
          </CardContent>
        </Card>

        {/* Guest Registration Card */}
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center shadow-glow">
                <UserPlus className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <CardTitle>Guest Registration</CardTitle>
                <CardDescription>Add a new guest visitor</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              variant="secondary"
              onClick={() => setIsAddGuestOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register New Guest
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Patient Registration Dialog */}
      <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
        <DialogContent className="bg-card shadow-medium max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Register New Patient</DialogTitle>
            <DialogDescription>
              Add a new patient to the system with their details
            </DialogDescription>
          </DialogHeader>
          <PatientRegistrationForm
            onSuccess={() => {
              setIsAddPatientOpen(false);
              toast.success("Patient registered successfully!");
            }}
            onCancel={() => setIsAddPatientOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Guest Registration Dialog */}
      <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
        <DialogContent className="bg-card shadow-medium max-w-2xl">
          <DialogHeader>
            <DialogTitle>Register New Guest</DialogTitle>
            <DialogDescription>
              Add a new guest visitor to the system
            </DialogDescription>
          </DialogHeader>
          <GuestRegistrationForm
            onSuccess={() => {
              setIsAddGuestOpen(false);
              toast.success("Guest registered successfully!");
            }}
            onCancel={() => setIsAddGuestOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};