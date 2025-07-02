package com.wealthbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<com.wealthbuddy.entity.Role, Integer> {
    Optional<com.wealthbuddy.entity.Role> findByName(com.wealthbuddy.entity.ERole name);
}