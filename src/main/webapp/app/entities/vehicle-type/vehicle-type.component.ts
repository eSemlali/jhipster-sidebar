import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IVehicleType } from '@/shared/model/vehicle-type.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import VehicleTypeService from './vehicle-type.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class VehicleType extends mixins(AlertMixin) {
  @Inject('vehicleTypeService') private vehicleTypeService: () => VehicleTypeService;
  private removeId: number = null;

  public vehicleTypes: IVehicleType[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllVehicleTypes();
  }

  public clear(): void {
    this.retrieveAllVehicleTypes();
  }

  public retrieveAllVehicleTypes(): void {
    this.isFetching = true;

    this.vehicleTypeService()
      .retrieve()
      .then(
        res => {
          this.vehicleTypes = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IVehicleType): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeVehicleType(): void {
    this.vehicleTypeService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhtestApp.vehicleType.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllVehicleTypes();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
