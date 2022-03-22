package com.s2m.jhtest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s2m.jhtest.web.rest.TestUtil;

public class VehicleBrandTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VehicleBrand.class);
        VehicleBrand vehicleBrand1 = new VehicleBrand();
        vehicleBrand1.setId(1L);
        VehicleBrand vehicleBrand2 = new VehicleBrand();
        vehicleBrand2.setId(vehicleBrand1.getId());
        assertThat(vehicleBrand1).isEqualTo(vehicleBrand2);
        vehicleBrand2.setId(2L);
        assertThat(vehicleBrand1).isNotEqualTo(vehicleBrand2);
        vehicleBrand1.setId(null);
        assertThat(vehicleBrand1).isNotEqualTo(vehicleBrand2);
    }
}
