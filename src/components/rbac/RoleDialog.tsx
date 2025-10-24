import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PERMISSION_GROUPS } from "@/constants/permissions";

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: {
    id: string;
    name: string;
    description: string;
    permissions: string[];
  } | null;
  onSave: (role: { name: string; description: string; permissions: string[] }) => void;
}

export function RoleDialog({ open, onOpenChange, role, onSave }: RoleDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description);
      setSelectedPermissions(role.permissions);
    } else {
      setName("");
      setDescription("");
      setSelectedPermissions([]);
    }
  }, [role, open]);

  const handleTogglePermission = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleToggleGroup = (groupPermissions: string[]) => {
    const allSelected = groupPermissions.every(p => selectedPermissions.includes(p));
    if (allSelected) {
      setSelectedPermissions(prev => prev.filter(p => !groupPermissions.includes(p)));
    } else {
      setSelectedPermissions(prev => [...new Set([...prev, ...groupPermissions])]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description, permissions: selectedPermissions });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {role ? "Editar Papel" : "Criar Novo Papel"}
          </DialogTitle>
          <DialogDescription>
            Defina um nome e selecione as permissões para este papel
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Papel</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Coordenador"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descrição das responsabilidades deste papel"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Permissões</Label>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              {Object.entries(PERMISSION_GROUPS).map(([key, group]) => {
                const groupPermissions = group.permissions.map(p => p.value);
                const allSelected = groupPermissions.every(p => selectedPermissions.includes(p));
                const someSelected = groupPermissions.some(p => selectedPermissions.includes(p));

                return (
                  <div key={key} className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={`group-${key}`}
                        checked={allSelected}
                        onCheckedChange={() => handleToggleGroup(groupPermissions)}
                        className={someSelected && !allSelected ? "data-[state=checked]:bg-primary/50" : ""}
                      />
                      <Label
                        htmlFor={`group-${key}`}
                        className="text-sm font-semibold cursor-pointer"
                      >
                        {group.label}
                      </Label>
                    </div>
                    <div className="ml-6 space-y-2">
                      {group.permissions.map((permission) => (
                        <div key={permission.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.value}
                            checked={selectedPermissions.includes(permission.value)}
                            onCheckedChange={() => handleTogglePermission(permission.value)}
                          />
                          <Label
                            htmlFor={permission.value}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {permission.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Separator className="mt-4" />
                  </div>
                );
              })}
            </ScrollArea>
            <p className="text-xs text-muted-foreground">
              {selectedPermissions.length} permissão(ões) selecionada(s)
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {role ? "Salvar Alterações" : "Criar Papel"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
