import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IVehicleBrand } from '@/shared/model/vehicle-brand.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import VehicleBrandService from './vehicle-brand.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class VehicleBrand extends mixins(AlertMixin) {
  @Inject('vehicleBrandService') private vehicleBrandService: () => VehicleBrandService;
  private removeId: number = null;

  public vehicleBrands: IVehicleBrand[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllVehicleBrands();
  }

  public clear(): void {
    this.retrieveAllVehicleBrands();
  }

  public retrieveAllVehicleBrands(): void {
    this.isFetching = true;

    this.vehicleBrandService()
      .retrieve()
      .then(
        res => {
          this.vehicleBrands = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IVehicleBrand): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeVehicleBrand(): void {
    this.vehicleBrandService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhtestApp.vehicleBrand.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllVehicleBrands();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
