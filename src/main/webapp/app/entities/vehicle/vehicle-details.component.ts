import { Component, Vue, Inject } from 'vue-property-decorator';

import { IVehicle } from '@/shared/model/vehicle.model';
import VehicleService from './vehicle.service';

@Component
export default class VehicleDetails extends Vue {
  @Inject('vehicleService') private vehicleService: () => VehicleService;
  public vehicle: IVehicle = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.vehicleId) {
        vm.retrieveVehicle(to.params.vehicleId);
      }
    });
  }

  public retrieveVehicle(vehicleId) {
    this.vehicleService()
      .find(vehicleId)
      .then(res => {
        this.vehicle = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
