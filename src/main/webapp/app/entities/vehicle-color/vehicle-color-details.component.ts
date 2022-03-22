import { Component, Vue, Inject } from 'vue-property-decorator';

import { IVehicleColor } from '@/shared/model/vehicle-color.model';
import VehicleColorService from './vehicle-color.service';

@Component
export default class VehicleColorDetails extends Vue {
  @Inject('vehicleColorService') private vehicleColorService: () => VehicleColorService;
  public vehicleColor: IVehicleColor = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.vehicleColorId) {
        vm.retrieveVehicleColor(to.params.vehicleColorId);
      }
    });
  }

  public retrieveVehicleColor(vehicleColorId) {
    this.vehicleColorService()
      .find(vehicleColorId)
      .then(res => {
        this.vehicleColor = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
