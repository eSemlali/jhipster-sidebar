import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IVehicleBrand, VehicleBrand } from '@/shared/model/vehicle-brand.model';
import VehicleBrandService from './vehicle-brand.service';

const validations: any = {
  vehicleBrand: {
    name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(500),
    },
    enabled: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class VehicleBrandUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('vehicleBrandService') private vehicleBrandService: () => VehicleBrandService;
  public vehicleBrand: IVehicleBrand = new VehicleBrand();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.vehicleBrandId) {
        vm.retrieveVehicleBrand(to.params.vehicleBrandId);
      }
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
    if (this.vehicleBrand.id) {
      this.vehicleBrandService()
        .update(this.vehicleBrand)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhtestApp.vehicleBrand.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.vehicleBrandService()
        .create(this.vehicleBrand)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhtestApp.vehicleBrand.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveVehicleBrand(vehicleBrandId): void {
    this.vehicleBrandService()
      .find(vehicleBrandId)
      .then(res => {
        this.vehicleBrand = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
