import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RoleDialog } from "./RoleDialog";
import { PermissionGate } from "@/components/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount?: number;
}

export function RoleManagementPanel() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Administrador",
      description: "Acesso total ao sistema",
      permissions: Object.values(PERMISSIONS),
      userCount: 2,
    },
    {
      id: "2",
      name: "Recepcionista",
      description: "Gerencia pacientes e agenda",
      permissions: [
        PERMISSIONS.PATIENT_VIEW_LIST,
        PERMISSIONS.PATIENT_VIEW_DETAILS,
        PERMISSIONS.PATIENT_CREATE,
        PERMISSIONS.APPOINTMENT_VIEW_LIST,
        PERMISSIONS.APPOINTMENT_CREATE,
        PERMISSIONS.GUEST_VIEW_LIST,
        PERMISSIONS.GUEST_CREATE,
        PERMISSIONS.LOGBOOK_VIEW,
        PERMISSIONS.LOGBOOK_CREATE,
      ],
      userCount: 5,
    },
    {
      id: "3",
      name: "Terapeuta",
      description: "Acesso a pacientes e agenda",
      permissions: [
        PERMISSIONS.PATIENT_VIEW_LIST,
        PERMISSIONS.PATIENT_VIEW_DETAILS,
        PERMISSIONS.APPOINTMENT_VIEW_LIST,
        PERMISSIONS.APPOINTMENT_CREATE,
        PERMISSIONS.APPOINTMENT_EDIT,
        PERMISSIONS.LOGBOOK_VIEW,
        PERMISSIONS.LOGBOOK_CREATE,
      ],
      userCount: 8,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleCreateRole = () => {
    setSelectedRole(null);
    setIsDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm("Tem certeza que deseja excluir este papel?")) {
      setRoles(roles.filter(r => r.id !== roleId));
    }
  };

  const handleSaveRole = (roleData: Omit<Role, "id" | "userCount">) => {
    if (selectedRole) {
      // Edit existing role
      setRoles(roles.map(r => 
        r.id === selectedRole.id 
          ? { ...r, ...roleData }
          : r
      ));
    } else {
      // Create new role
      const newRole: Role = {
        id: Date.now().toString(),
        ...roleData,
        userCount: 0,
      };
      setRoles([...roles, newRole]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Papéis</h2>
          <p className="text-muted-foreground">
            Crie e gerencie papéis personalizados para sua organização
          </p>
        </div>
        <PermissionGate permission={PERMISSIONS.RBAC_CREATE_ROLE}>
          <Button onClick={handleCreateRole}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Papel
          </Button>
        </PermissionGate>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </div>
                <Badge variant="secondary">{role.userCount} usuários</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Permissões:</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((perm) => (
                      <Badge key={perm} variant="outline" className="text-xs">
                        {perm.split(':')[0]}
                      </Badge>
                    ))}
                    {role.permissions.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{role.permissions.length - 3} mais
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <PermissionGate permission={PERMISSIONS.RBAC_EDIT_ROLE}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditRole(role)}
                      className="flex-1"
                    >
                      <Pencil className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                  </PermissionGate>
                  <PermissionGate permission={PERMISSIONS.RBAC_DELETE_ROLE}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                      className="flex-1"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Excluir
                    </Button>
                  </PermissionGate>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <RoleDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        role={selectedRole}
        onSave={handleSaveRole}
      />
    </div>
  );
}
