package com.s2m.jhtest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s2m.jhtest.web.rest.TestUtil;

public class VehicleColorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VehicleColor.class);
        VehicleColor vehicleColor1 = new VehicleColor();
        vehicleColor1.setId(1L);
        VehicleColor vehicleColor2 = new VehicleColor();
        vehicleColor2.setId(vehicleColor1.getId());
        assertThat(vehicleColor1).isEqualTo(vehicleColor2);
        vehicleColor2.setId(2L);
        assertThat(vehicleColor1).isNotEqualTo(vehicleColor2);
        vehicleColor1.setId(null);
        assertThat(vehicleColor1).isNotEqualTo(vehicleColor2);
    }
}
