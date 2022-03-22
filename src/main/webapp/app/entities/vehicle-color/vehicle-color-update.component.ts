import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IVehicleColor, VehicleColor } from '@/shared/model/vehicle-color.model';
import VehicleColorService from './vehicle-color.service';

const validations: any = {
  vehicleColor: {
    name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(500),
    },
    hexColor: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(6),
    },
    enabled: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class VehicleColorUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('vehicleColorService') private vehicleColorService: () => VehicleColorService;
  public vehicleColor: IVehicleColor = new VehicleColor();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.vehicleColorId) {
        vm.retrieveVehicleColor(to.params.vehicleColorId);
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
    if (this.vehicleColor.id) {
      this.vehicleColorService()
        .update(this.vehicleColor)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhtestApp.vehicleColor.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.vehicleColorService()
        .create(this.vehicleColor)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhtestApp.vehicleColor.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveVehicleColor(vehicleColorId): void {
    this.vehicleColorService()
      .find(vehicleColorId)
      .then(res => {
        this.vehicleColor = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
