import { Component, Vue, Inject } from 'vue-property-decorator';

import { IVehicleType } from '@/shared/model/vehicle-type.model';
import VehicleTypeService from './vehicle-type.service';

@Component
export default class VehicleTypeDetails extends Vue {
  @Inject('vehicleTypeService') private vehicleTypeService: () => VehicleTypeService;
  public vehicleType: IVehicleType = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.vehicleTypeId) {
        vm.retrieveVehicleType(to.params.vehicleTypeId);
      }
    });
  }

  public retrieveVehicleType(vehicleTypeId) {
    this.vehicleTypeService()
      .find(vehicleTypeId)
      .then(res => {
        this.vehicleType = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
