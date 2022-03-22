export interface IVehicleColor {
  id?: number;
  name?: string;
  hexColor?: string;
  enabled?: boolean;
}

export class VehicleColor implements IVehicleColor {
  constructor(public id?: number, public name?: string, public hexColor?: string, public enabled?: boolean) {
    this.enabled = this.enabled || false;
  }
}
