/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import VehicleDetailComponent from '@/entities/vehicle/vehicle-details.vue';
import VehicleClass from '@/entities/vehicle/vehicle-details.component';
import VehicleService from '@/entities/vehicle/vehicle.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Vehicle Management Detail Component', () => {
    let wrapper: Wrapper<VehicleClass>;
    let comp: VehicleClass;
    let vehicleServiceStub: SinonStubbedInstance<VehicleService>;

    beforeEach(() => {
      vehicleServiceStub = sinon.createStubInstance<VehicleService>(VehicleService);

      wrapper = shallowMount<VehicleClass>(VehicleDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { vehicleService: () => vehicleServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundVehicle = { id: 123 };
        vehicleServiceStub.find.resolves(foundVehicle);

        // WHEN
        comp.retrieveVehicle(123);
        await comp.$nextTick();

        // THEN
        expect(comp.vehicle).toBe(foundVehicle);
      });
    });
  });
});
