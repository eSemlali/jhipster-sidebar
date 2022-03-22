import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Client = () => import('@/entities/client/client.vue');
// prettier-ignore
const ClientUpdate = () => import('@/entities/client/client-update.vue');
// prettier-ignore
const ClientDetails = () => import('@/entities/client/client-details.vue');
// prettier-ignore
const Vehicle = () => import('@/entities/vehicle/vehicle.vue');
// prettier-ignore
const VehicleUpdate = () => import('@/entities/vehicle/vehicle-update.vue');
// prettier-ignore
const VehicleDetails = () => import('@/entities/vehicle/vehicle-details.vue');
// prettier-ignore
const VehicleType = () => import('@/entities/vehicle-type/vehicle-type.vue');
// prettier-ignore
const VehicleTypeUpdate = () => import('@/entities/vehicle-type/vehicle-type-update.vue');
// prettier-ignore
const VehicleTypeDetails = () => import('@/entities/vehicle-type/vehicle-type-details.vue');
// prettier-ignore
const VehicleColor = () => import('@/entities/vehicle-color/vehicle-color.vue');
// prettier-ignore
const VehicleColorUpdate = () => import('@/entities/vehicle-color/vehicle-color-update.vue');
// prettier-ignore
const VehicleColorDetails = () => import('@/entities/vehicle-color/vehicle-color-details.vue');
// prettier-ignore
const VehicleBrand = () => import('@/entities/vehicle-brand/vehicle-brand.vue');
// prettier-ignore
const VehicleBrandUpdate = () => import('@/entities/vehicle-brand/vehicle-brand-update.vue');
// prettier-ignore
const VehicleBrandDetails = () => import('@/entities/vehicle-brand/vehicle-brand-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/client',
    name: 'Client',
    component: Client,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/client/new',
    name: 'ClientCreate',
    component: ClientUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/client/:clientId/edit',
    name: 'ClientEdit',
    component: ClientUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/client/:clientId/view',
    name: 'ClientView',
    component: ClientDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle',
    name: 'Vehicle',
    component: Vehicle,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle/new',
    name: 'VehicleCreate',
    component: VehicleUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle/:vehicleId/edit',
    name: 'VehicleEdit',
    component: VehicleUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle/:vehicleId/view',
    name: 'VehicleView',
    component: VehicleDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-type',
    name: 'VehicleType',
    component: VehicleType,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-type/new',
    name: 'VehicleTypeCreate',
    component: VehicleTypeUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-type/:vehicleTypeId/edit',
    name: 'VehicleTypeEdit',
    component: VehicleTypeUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-type/:vehicleTypeId/view',
    name: 'VehicleTypeView',
    component: VehicleTypeDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-color',
    name: 'VehicleColor',
    component: VehicleColor,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-color/new',
    name: 'VehicleColorCreate',
    component: VehicleColorUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-color/:vehicleColorId/edit',
    name: 'VehicleColorEdit',
    component: VehicleColorUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-color/:vehicleColorId/view',
    name: 'VehicleColorView',
    component: VehicleColorDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-brand',
    name: 'VehicleBrand',
    component: VehicleBrand,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-brand/new',
    name: 'VehicleBrandCreate',
    component: VehicleBrandUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-brand/:vehicleBrandId/edit',
    name: 'VehicleBrandEdit',
    component: VehicleBrandUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/vehicle-brand/:vehicleBrandId/view',
    name: 'VehicleBrandView',
    component: VehicleBrandDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
