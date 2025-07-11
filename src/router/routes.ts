import { StepUpLevel } from '@/stores/AuthStore';
import type { RouteRecordRaw } from 'vue-router';

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: () => import('../views/LandingView.vue'),
    meta: {
      layout: 'DefaultLayout',
      requiresAuth: false,
      requiredStepUpLevel: StepUpLevel.NONE,
    },
  },
  {
    path: '/admin/personen',
    name: 'person-management',
    component: () => import('../views/admin/PersonManagementView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'personenverwaltung',
    },
  },
  {
    path: '/admin/personen/:id',
    name: 'person-details',
    component: () => import('../views/admin/PersonDetailsView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'personenverwaltung',
    },
  },
  {
    path: '/admin/personen/new',
    name: 'create-person',
    component: () => import('../views/admin/PersonCreationView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: ['personenverwaltung', 'personenanlegen'],
    },
  },
  {
    path: '/admin/personen/import',
    name: 'person-import',
    component: () => import('../views/admin/PersonImportView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiresPermission: 'personenimport',
    },
  },
  {
    path: '/admin/klassen',
    name: 'klasse-management',
    component: () => import('../views/admin/organisationen/KlassenManagementView.vue'),
    meta: {
      requiresAuth: true,
      layout: 'AdminLayout',
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'klassenverwaltung',
    },
  },
  {
    path: '/admin/klassen/new',
    name: 'create-klasse',
    component: () => import('../views/admin/organisationen/KlasseCreationView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'klassenverwaltung',
    },
  },
  {
    path: '/admin/klassen/:id',
    name: 'klasse-details',
    component: () => import('../views/admin/organisationen/KlasseDetailsView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'klassenverwaltung',
    },
  },
  {
    path: '/admin/rollen/new',
    name: 'create-rolle',
    component: () => import('../views/admin/rollen/RolleCreationView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'rollenverwaltung',
    },
  },
  {
    path: '/admin/rollen/:id',
    name: 'rolle-details',
    component: () => import('../views/admin/rollen/RolleDetailsView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'rollenverwaltung',
    },
  },
  {
    path: '/admin/rollen',
    name: 'rolle-management',
    component: () => import('../views/admin/rollen/RolleManagementView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'rollenverwaltung',
    },
  },
  {
    path: '/admin/schulen/new',
    name: 'create-schule',
    component: () => import('../views/admin/organisationen/SchuleCreationView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'schulverwaltung',
    },
  },
  {
    path: '/admin/schulen',
    name: 'schule-management',
    component: () => import('../views/admin/organisationen/SchuleManagementView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'schulverwaltung',
    },
  },
  {
    path: '/admin/schultraeger',
    name: 'schultraeger-management',
    component: () => import('../views/admin/organisationen/SchultraegerManagementView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'schultraegerverwaltung',
    },
  },
  {
    path: '/admin/schultraeger/new',
    name: 'create-schultraeger',
    component: () => import('../views/admin/organisationen/SchultraegerCreationView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'schultraegerverwaltung',
    },
  },
  {
    path: '/admin/schultraeger/:id',
    name: 'schultraeger-details',
    component: () => import('../views/admin/organisationen/SchultraegerDetailsView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'schultraegerverwaltung',
    },
  },
  {
    path: '/admin/hinweise/new',
    name: 'hinweise-creation',
    component: () => import('../views/admin/HinweiseCreationView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: ['portalverwaltung', 'hinweisebearbeiten'],
    },
  },
  {
    path: '/start',
    name: 'start',
    component: () => import('../views/StartView.vue'),
    meta: {
      layout: 'DefaultLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.SILVER,
    },
  },
  {
    path: '/login-error',
    name: 'login-error',
    component: () => import('../views/UnknownUserErrorView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      layout: 'DefaultLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.SILVER,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
  {
    path: '/no-second-factor',
    name: 'no-second-factor',
    component: () => import('../views/NoSecondFactorView.vue'),
  },
  {
    path: '/admin/rolle/mapping',
    name: 'rolle-mapping',
    component: () => import('../views/admin/RolleMappingView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'rollenverwaltung',
    },
  },
  {
    path: '/admin/rolle/mapping/schulcloud',
    name: 'rolle-mapping-schulcloud',
    component: () => import('../views/admin/RolleMappingView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'rollenverwaltung',
    },
  },
  {
    path: '/admin/rolle/mapping/moodle',
    name: 'rolle-mapping-moodle',
    component: () => import('../views/admin/RolleMappingView.vue'),
    meta: {
      layout: 'AdminLayout',
      requiresAuth: true,
      requiredStepUpLevel: StepUpLevel.GOLD,
      requiresPermission: 'rollenverwaltung',
    },
  },
];

export default routes;
