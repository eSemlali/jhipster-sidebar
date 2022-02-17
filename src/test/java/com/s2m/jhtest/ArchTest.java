package com.s2m.jhtest;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.s2m.jhtest");

        noClasses()
            .that()
                .resideInAnyPackage("com.s2m.jhtest.service..")
            .or()
                .resideInAnyPackage("com.s2m.jhtest.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.s2m.jhtest.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
