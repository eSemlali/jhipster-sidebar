package com.s2m.jhtest.repository;

import com.s2m.jhtest.domain.VehicleType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the VehicleType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleTypeRepository extends JpaRepository<VehicleType, Long> {
}
