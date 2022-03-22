import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import VehicleService from '../vehicle/vehicle.service';
import { IVehicle } from '@/shared/model/vehicle.model';

import AlertService from '@/shared/alert/alert.service';
import { IClient, Client } from '@/shared/model/client.model';
import ClientService from './client.service';

const validations: any = {
  client: {
    name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(500),
    },
    email: {
      minLength: minLength(1),
      maxLength: maxLength(500),
    },
    mobile: {
      minLength: minLength(1),
      maxLength: maxLength(500),
    },
    enabled: {
      required,
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
export default class ClientUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('clientService') private clientService: () => ClientService;
  public client: IClient = new Client();

  @Inject('vehicleService') private vehicleService: () => VehicleService;

  public vehicles: IVehicle[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clientId) {
        vm.retrieveClient(to.params.clientId);
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
    if (this.client.id) {
      this.clientService()
        .update(this.client)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhtestApp.client.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.clientService()
        .create(this.client)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhtestApp.client.created', { param: param.id });
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
      this.client[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.client[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.client[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.client[field] = null;
    }
  }

  public retrieveClient(clientId): void {
    this.clientService()
      .find(clientId)
      .then(res => {
        res.created = new Date(res.created);
        res.lastUpdate = new Date(res.lastUpdate);
        this.client = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.vehicleService()
      .retrieve()
      .then(res => {
        this.vehicles = res.data;
      });
  }
}
