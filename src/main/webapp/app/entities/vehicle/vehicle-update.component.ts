import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import VehicleTypeService from '../vehicle-type/vehicle-type.service';
import { IVehicleType } from '@/shared/model/vehicle-type.model';

import VehicleColorService from '../vehicle-color/vehicle-color.service';
import { IVehicleColor } from '@/shared/model/vehicle-color.model';

import VehicleBrandService from '../vehicle-brand/vehicle-brand.service';
import { IVehicleBrand } from '@/shared/model/vehicle-brand.model';

import ClientService from '../client/client.service';
import { IClient } from '@/shared/model/client.model';

import AlertService from '@/shared/alert/alert.service';
import { IVehicle, Vehicle } from '@/shared/model/vehicle.model';
import VehicleService from './vehicle.service';

const validations: any = {
  vehicle: {
    plate: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(500),
    },
    created: {
      required,
    },
    lastUpdate: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class VehicleUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('vehicleService') private vehicleService: () => VehicleService;
  public vehicle: IVehicle = new Vehicle();

  @Inject('vehicleTypeService') private vehicleTypeService: () => VehicleTypeService;

  public vehicleTypes: IVehicleType[] = [];

  @Inject('vehicleColorService') private vehicleColorService: () => VehicleColorService;

  public vehicleColors: IVehicleColor[] = [];

  @Inject('vehicleBrandService') private vehicleBrandService: () => VehicleBrandService;

  public vehicleBrands: IVehicleBrand[] = [];

  @Inject('clientService') private clientService: () => ClientService;

  public clients: IClient[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.vehicleId) {
        vm.retrieveVehicle(to.params.vehicleId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.vehicle.id) {
      this.vehicleService()
        .update(this.vehicle)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhtestApp.vehicle.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.vehicleService()
        .create(this.vehicle)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhtestApp.vehicle.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.vehicle[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.vehicle[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.vehicle[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.vehicle[field] = null;
    }
  }

  public retrieveVehicle(vehicleId): void {
    this.vehicleService()
      .find(vehicleId)
      .then(res => {
        res.created = new Date(res.created);
        res.lastUpdate = new Date(res.lastUpdate);
        this.vehicle = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.vehicleTypeService()
      .retrieve()
      .then(res => {
        this.vehicleTypes = res.data;
      });
    this.vehicleColorService()
      .retrieve()
      .then(res => {
        this.vehicleColors = res.data;
      });
    this.vehicleBrandService()
      .retrieve()
      .then(res => {
        this.vehicleBrands = res.data;
      });
    this.clientService()
      .retrieve()
      .then(res => {
        this.clients = res.data;
      });
  }
}
