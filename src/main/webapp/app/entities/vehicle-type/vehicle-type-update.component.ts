import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IVehicleType, VehicleType } from '@/shared/model/vehicle-type.model';
import VehicleTypeService from './vehicle-type.service';

const validations: any = {
  vehicleType: {
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
export default class VehicleTypeUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('vehicleTypeService') private vehicleTypeService: () => VehicleTypeService;
  public vehicleType: IVehicleType = new VehicleType();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.vehicleTypeId) {
        vm.retrieveVehicleType(to.params.vehicleTypeId);
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
    if (this.vehicleType.id) {
      this.vehicleTypeService()
        .update(this.vehicleType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhtestApp.vehicleType.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.vehicleTypeService()
        .create(this.vehicleType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhtestApp.vehicleType.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveVehicleType(vehicleTypeId): void {
    this.vehicleTypeService()
      .find(vehicleTypeId)
      .then(res => {
        this.vehicleType = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
