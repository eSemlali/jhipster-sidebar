package com.s2m.jhtest.repository;

import com.s2m.jhtest.domain.VehicleColor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the VehicleColor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleColorRepository extends JpaRepository<VehicleColor, Long> {
}
