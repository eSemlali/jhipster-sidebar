/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import VehicleTypeDetailComponent from '@/entities/vehicle-type/vehicle-type-details.vue';
import VehicleTypeClass from '@/entities/vehicle-type/vehicle-type-details.component';
import VehicleTypeService from '@/entities/vehicle-type/vehicle-type.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('VehicleType Management Detail Component', () => {
    let wrapper: Wrapper<VehicleTypeClass>;
    let comp: VehicleTypeClass;
    let vehicleTypeServiceStub: SinonStubbedInstance<VehicleTypeService>;

    beforeEach(() => {
      vehicleTypeServiceStub = sinon.createStubInstance<VehicleTypeService>(VehicleTypeService);

      wrapper = shallowMount<VehicleTypeClass>(VehicleTypeDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { vehicleTypeService: () => vehicleTypeServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundVehicleType = { id: 123 };
        vehicleTypeServiceStub.find.resolves(foundVehicleType);

        // WHEN
        comp.retrieveVehicleType(123);
        await comp.$nextTick();

        // THEN
        expect(comp.vehicleType).toBe(foundVehicleType);
      });
    });
  });
});
