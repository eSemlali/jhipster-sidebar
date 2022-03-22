/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import VehicleColorUpdateComponent from '@/entities/vehicle-color/vehicle-color-update.vue';
import VehicleColorClass from '@/entities/vehicle-color/vehicle-color-update.component';
import VehicleColorService from '@/entities/vehicle-color/vehicle-color.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('VehicleColor Management Update Component', () => {
    let wrapper: Wrapper<VehicleColorClass>;
    let comp: VehicleColorClass;
    let vehicleColorServiceStub: SinonStubbedInstance<VehicleColorService>;

    beforeEach(() => {
      vehicleColorServiceStub = sinon.createStubInstance<VehicleColorService>(VehicleColorService);

      wrapper = shallowMount<VehicleColorClass>(VehicleColorUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          vehicleColorService: () => vehicleColorServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.vehicleColor = entity;
        vehicleColorServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(vehicleColorServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.vehicleColor = entity;
        vehicleColorServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(vehicleColorServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
