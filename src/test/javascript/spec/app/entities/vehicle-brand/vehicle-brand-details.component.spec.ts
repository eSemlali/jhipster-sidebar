/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import VehicleBrandDetailComponent from '@/entities/vehicle-brand/vehicle-brand-details.vue';
import VehicleBrandClass from '@/entities/vehicle-brand/vehicle-brand-details.component';
import VehicleBrandService from '@/entities/vehicle-brand/vehicle-brand.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('VehicleBrand Management Detail Component', () => {
    let wrapper: Wrapper<VehicleBrandClass>;
    let comp: VehicleBrandClass;
    let vehicleBrandServiceStub: SinonStubbedInstance<VehicleBrandService>;

    beforeEach(() => {
      vehicleBrandServiceStub = sinon.createStubInstance<VehicleBrandService>(VehicleBrandService);

      wrapper = shallowMount<VehicleBrandClass>(VehicleBrandDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { vehicleBrandService: () => vehicleBrandServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundVehicleBrand = { id: 123 };
        vehicleBrandServiceStub.find.resolves(foundVehicleBrand);

        // WHEN
        comp.retrieveVehicleBrand(123);
        await comp.$nextTick();

        // THEN
        expect(comp.vehicleBrand).toBe(foundVehicleBrand);
      });
    });
  });
});
