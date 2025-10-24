import { useState } from "react";
import { UserPlus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PermissionGate } from "@/components/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  status: "active" | "inactive";
}

const mockRoles = [
  { id: "1", name: "Administrador" },
  { id: "2", name: "Recepcionista" },
  { id: "3", name: "Terapeuta" },
  { id: "4", name: "Coordenador" },
];

export function StaffRoleManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Maria Silva",
      email: "maria@clinic.com",
      roleId: "1",
      roleName: "Administrador",
      status: "active",
    },
    {
      id: "2",
      name: "João Santos",
      email: "joao@clinic.com",
      roleId: "2",
      roleName: "Recepcionista",
      status: "active",
    },
    {
      id: "3",
      name: "Ana Costa",
      email: "ana@clinic.com",
      roleId: "3",
      roleName: "Terapeuta",
      status: "active",
    },
  ]);

  const handleRoleChange = (staffId: string, newRoleId: string) => {
    const role = mockRoles.find(r => r.id === newRoleId);
    if (role) {
      setStaff(staff.map(s =>
        s.id === staffId
          ? { ...s, roleId: newRoleId, roleName: role.name }
          : s
      ));
    }
  };

  const handleStatusToggle = (staffId: string) => {
    setStaff(staff.map(s =>
      s.id === staffId
        ? { ...s, status: s.status === "active" ? "inactive" : "active" }
        : s
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Staff</h2>
          <p className="text-muted-foreground">
            Atribua papéis e gerencie acessos dos membros da equipe
          </p>
        </div>
        <PermissionGate permission={PERMISSIONS.STAFF_CREATE}>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Adicionar Staff
          </Button>
        </PermissionGate>
      </div>

      <div className="grid gap-4">
        {staff.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <Badge variant={member.status === "active" ? "default" : "secondary"}>
                  {member.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <PermissionGate
                    permission={PERMISSIONS.STAFF_EDIT_ROLES}
                    fallback={
                      <span className="text-sm font-medium">{member.roleName}</span>
                    }
                  >
                    <Select
                      value={member.roleId}
                      onValueChange={(value) => handleRoleChange(member.id, value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mockRoles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </PermissionGate>
                </div>

                <PermissionGate permission={PERMISSIONS.STAFF_DEACTIVATE}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusToggle(member.id)}
                  >
                    {member.status === "active" ? "Desativar" : "Ativar"}
                  </Button>
                </PermissionGate>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
