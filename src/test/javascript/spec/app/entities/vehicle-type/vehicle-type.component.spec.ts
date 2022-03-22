/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import VehicleTypeComponent from '@/entities/vehicle-type/vehicle-type.vue';
import VehicleTypeClass from '@/entities/vehicle-type/vehicle-type.component';
import VehicleTypeService from '@/entities/vehicle-type/vehicle-type.service';

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
  describe('VehicleType Management Component', () => {
    let wrapper: Wrapper<VehicleTypeClass>;
    let comp: VehicleTypeClass;
    let vehicleTypeServiceStub: SinonStubbedInstance<VehicleTypeService>;

    beforeEach(() => {
      vehicleTypeServiceStub = sinon.createStubInstance<VehicleTypeService>(VehicleTypeService);
      vehicleTypeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<VehicleTypeClass>(VehicleTypeComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          vehicleTypeService: () => vehicleTypeServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      vehicleTypeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllVehicleTypes();
      await comp.$nextTick();

      // THEN
      expect(vehicleTypeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.vehicleTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      vehicleTypeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeVehicleType();
      await comp.$nextTick();

      // THEN
      expect(vehicleTypeServiceStub.delete.called).toBeTruthy();
      expect(vehicleTypeServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
