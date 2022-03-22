/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import VehicleBrandComponent from '@/entities/vehicle-brand/vehicle-brand.vue';
import VehicleBrandClass from '@/entities/vehicle-brand/vehicle-brand.component';
import VehicleBrandService from '@/entities/vehicle-brand/vehicle-brand.service';

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
  describe('VehicleBrand Management Component', () => {
    let wrapper: Wrapper<VehicleBrandClass>;
    let comp: VehicleBrandClass;
    let vehicleBrandServiceStub: SinonStubbedInstance<VehicleBrandService>;

    beforeEach(() => {
      vehicleBrandServiceStub = sinon.createStubInstance<VehicleBrandService>(VehicleBrandService);
      vehicleBrandServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<VehicleBrandClass>(VehicleBrandComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          vehicleBrandService: () => vehicleBrandServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      vehicleBrandServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllVehicleBrands();
      await comp.$nextTick();

      // THEN
      expect(vehicleBrandServiceStub.retrieve.called).toBeTruthy();
      expect(comp.vehicleBrands[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      vehicleBrandServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeVehicleBrand();
      await comp.$nextTick();

      // THEN
      expect(vehicleBrandServiceStub.delete.called).toBeTruthy();
      expect(vehicleBrandServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
