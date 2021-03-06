/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import VehicleColorComponent from '@/entities/vehicle-color/vehicle-color.vue';
import VehicleColorClass from '@/entities/vehicle-color/vehicle-color.component';
import VehicleColorService from '@/entities/vehicle-color/vehicle-color.service';

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
  describe('VehicleColor Management Component', () => {
    let wrapper: Wrapper<VehicleColorClass>;
    let comp: VehicleColorClass;
    let vehicleColorServiceStub: SinonStubbedInstance<VehicleColorService>;

    beforeEach(() => {
      vehicleColorServiceStub = sinon.createStubInstance<VehicleColorService>(VehicleColorService);
      vehicleColorServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<VehicleColorClass>(VehicleColorComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          vehicleColorService: () => vehicleColorServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      vehicleColorServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllVehicleColors();
      await comp.$nextTick();

      // THEN
      expect(vehicleColorServiceStub.retrieve.called).toBeTruthy();
      expect(comp.vehicleColors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      vehicleColorServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeVehicleColor();
      await comp.$nextTick();

      // THEN
      expect(vehicleColorServiceStub.delete.called).toBeTruthy();
      expect(vehicleColorServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
