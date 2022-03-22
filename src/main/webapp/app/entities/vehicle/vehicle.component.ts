import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IVehicle } from '@/shared/model/vehicle.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import VehicleService from './vehicle.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Vehicle extends mixins(AlertMixin) {
  @Inject('vehicleService') private vehicleService: () => VehicleService;
  private removeId: number = null;

  public vehicles: IVehicle[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllVehicles();
  }

  public clear(): void {
    this.retrieveAllVehicles();
  }

  public retrieveAllVehicles(): void {
    this.isFetching = true;

    this.vehicleService()
      .retrieve()
      .then(
        res => {
          this.vehicles = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IVehicle): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeVehicle(): void {
    this.vehicleService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhtestApp.vehicle.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllVehicles();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
