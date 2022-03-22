package com.s2m.jhtest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s2m.jhtest.web.rest.TestUtil;

public class VehicleTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VehicleType.class);
        VehicleType vehicleType1 = new VehicleType();
        vehicleType1.setId(1L);
        VehicleType vehicleType2 = new VehicleType();
        vehicleType2.setId(vehicleType1.getId());
        assertThat(vehicleType1).isEqualTo(vehicleType2);
        vehicleType2.setId(2L);
        assertThat(vehicleType1).isNotEqualTo(vehicleType2);
        vehicleType1.setId(null);
        assertThat(vehicleType1).isNotEqualTo(vehicleType2);
    }
}
