package com.Infosys.Repository;

import com.Infosys.Entity.Employee;
import com.Infosys.Entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findByUsersUsername(String username);
    List<Employee> findByManagerUsersUsername(String username);
}
