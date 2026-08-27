import { RollenArt, RollenSystemRecht } from '@/api-client/generated';

export function isHiddenSystemrecht(enumValue: RollenSystemRecht): boolean {
  return (
    enumValue == RollenSystemRecht.MigrationDurchfuehren ||
    enumValue == RollenSystemRecht.CronDurchfuehren ||
    enumValue == RollenSystemRecht.PersonenLesen
  );
}

export function allowedSystemrechteForRollenart(rollenArt: RollenArt): RollenSystemRecht[] {
  const allowedSystemrechte: Record<RollenArt, RollenSystemRecht[]> = {
    LEIT: [RollenSystemRecht.PersonenVerwalten, RollenSystemRecht.PersonenLesen],
    SYSADMIN: [
      RollenSystemRecht.PersonenVerwalten,
      RollenSystemRecht.PersonenLesen,
      RollenSystemRecht.PersonenAnlegen,
      RollenSystemRecht.ServiceproviderVerwalten,
      RollenSystemRecht.RollenVerwalten,
    ],
    PORTALADMINMANAGER: [
      RollenSystemRecht.PersonenVerwalten,
      RollenSystemRecht.PersonenLesen,
      RollenSystemRecht.PersonenAnlegen,
      RollenSystemRecht.PersonenSofortLoeschen,
    ],
    PORTALADMIN: Object.values(RollenSystemRecht),
    EXTERN: [],
    LEHR: [],
    LERN: [],
    ORGADMIN: [],
  };

  return allowedSystemrechte[rollenArt];
}
