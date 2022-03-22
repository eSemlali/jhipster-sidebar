export interface IVehicleType {
  id?: number;
  name?: string;
  enabled?: boolean;
}

export class VehicleType implements IVehicleType {
  constructor(public id?: number, public name?: string, public enabled?: boolean) {
    this.enabled = this.enabled || false;
  }
}
