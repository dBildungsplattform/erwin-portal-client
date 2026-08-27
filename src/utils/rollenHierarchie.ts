import { RollenArt } from '@/api-client/generated';

export function creatableRollenByRollenArt(rollenArt: RollenArt): RollenArt[] {
  const creatableRoles: Record<RollenArt, RollenArt[]> = {
    PORTALADMINMANAGER: [RollenArt.Portaladmin],
    PORTALADMIN: Object.values(RollenArt),
    SYSADMIN: [RollenArt.Sysadmin, RollenArt.Lehr, RollenArt.Lern],
    EXTERN: [],
    LEHR: [],
    LEIT: [],
    LERN: [],
    ORGADMIN: [],
  };

  return creatableRoles[rollenArt];
}
