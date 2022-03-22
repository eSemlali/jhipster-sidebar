import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IVehicleColor } from '@/shared/model/vehicle-color.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import VehicleColorService from './vehicle-color.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class VehicleColor extends mixins(AlertMixin) {
  @Inject('vehicleColorService') private vehicleColorService: () => VehicleColorService;
  private removeId: number = null;

  public vehicleColors: IVehicleColor[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllVehicleColors();
  }

  public clear(): void {
    this.retrieveAllVehicleColors();
  }

  public retrieveAllVehicleColors(): void {
    this.isFetching = true;

    this.vehicleColorService()
      .retrieve()
      .then(
        res => {
          this.vehicleColors = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IVehicleColor): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeVehicleColor(): void {
    this.vehicleColorService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhtestApp.vehicleColor.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllVehicleColors();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
