import { useAuth } from "./useAuth";
import { Permission } from "@/constants/permissions";

export function usePermissions() {
  const { permissions, hasPermission } = useAuth();

  const can = (permission: Permission): boolean => {
    return hasPermission(permission);
  };

  const canAny = (permissionList: Permission[]): boolean => {
    return permissionList.some(permission => hasPermission(permission));
  };

  const canAll = (permissionList: Permission[]): boolean => {
    return permissionList.every(permission => hasPermission(permission));
  };

  return {
    permissions,
    can,
    canAny,
    canAll,
  };
}
