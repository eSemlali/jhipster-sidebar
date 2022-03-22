import { Component, Vue, Inject } from 'vue-property-decorator';

import { IVehicleBrand } from '@/shared/model/vehicle-brand.model';
import VehicleBrandService from './vehicle-brand.service';

@Component
export default class VehicleBrandDetails extends Vue {
  @Inject('vehicleBrandService') private vehicleBrandService: () => VehicleBrandService;
  public vehicleBrand: IVehicleBrand = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.vehicleBrandId) {
        vm.retrieveVehicleBrand(to.params.vehicleBrandId);
      }
    });
  }

  public retrieveVehicleBrand(vehicleBrandId) {
    this.vehicleBrandService()
      .find(vehicleBrandId)
      .then(res => {
        this.vehicleBrand = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
