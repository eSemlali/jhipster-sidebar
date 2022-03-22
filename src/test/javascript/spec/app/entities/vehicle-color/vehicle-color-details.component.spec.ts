/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import VehicleColorDetailComponent from '@/entities/vehicle-color/vehicle-color-details.vue';
import VehicleColorClass from '@/entities/vehicle-color/vehicle-color-details.component';
import VehicleColorService from '@/entities/vehicle-color/vehicle-color.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('VehicleColor Management Detail Component', () => {
    let wrapper: Wrapper<VehicleColorClass>;
    let comp: VehicleColorClass;
    let vehicleColorServiceStub: SinonStubbedInstance<VehicleColorService>;

    beforeEach(() => {
      vehicleColorServiceStub = sinon.createStubInstance<VehicleColorService>(VehicleColorService);

      wrapper = shallowMount<VehicleColorClass>(VehicleColorDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { vehicleColorService: () => vehicleColorServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundVehicleColor = { id: 123 };
        vehicleColorServiceStub.find.resolves(foundVehicleColor);

        // WHEN
        comp.retrieveVehicleColor(123);
        await comp.$nextTick();

        // THEN
        expect(comp.vehicleColor).toBe(foundVehicleColor);
      });
    });
  });
});
