/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import VehicleComponent from '@/entities/vehicle/vehicle.vue';
import VehicleClass from '@/entities/vehicle/vehicle.component';
import VehicleService from '@/entities/vehicle/vehicle.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Vehicle Management Component', () => {
    let wrapper: Wrapper<VehicleClass>;
    let comp: VehicleClass;
    let vehicleServiceStub: SinonStubbedInstance<VehicleService>;

    beforeEach(() => {
      vehicleServiceStub = sinon.createStubInstance<VehicleService>(VehicleService);
      vehicleServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<VehicleClass>(VehicleComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          vehicleService: () => vehicleServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      vehicleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllVehicles();
      await comp.$nextTick();

      // THEN
      expect(vehicleServiceStub.retrieve.called).toBeTruthy();
      expect(comp.vehicles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      vehicleServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeVehicle();
      await comp.$nextTick();

      // THEN
      expect(vehicleServiceStub.delete.called).toBeTruthy();
      expect(vehicleServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
