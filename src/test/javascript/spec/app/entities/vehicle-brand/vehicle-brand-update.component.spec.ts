/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import VehicleBrandUpdateComponent from '@/entities/vehicle-brand/vehicle-brand-update.vue';
import VehicleBrandClass from '@/entities/vehicle-brand/vehicle-brand-update.component';
import VehicleBrandService from '@/entities/vehicle-brand/vehicle-brand.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('VehicleBrand Management Update Component', () => {
    let wrapper: Wrapper<VehicleBrandClass>;
    let comp: VehicleBrandClass;
    let vehicleBrandServiceStub: SinonStubbedInstance<VehicleBrandService>;

    beforeEach(() => {
      vehicleBrandServiceStub = sinon.createStubInstance<VehicleBrandService>(VehicleBrandService);

      wrapper = shallowMount<VehicleBrandClass>(VehicleBrandUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          vehicleBrandService: () => vehicleBrandServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.vehicleBrand = entity;
        vehicleBrandServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(vehicleBrandServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.vehicleBrand = entity;
        vehicleBrandServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(vehicleBrandServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
