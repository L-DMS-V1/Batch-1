package com.Infosys.Entity;

import jakarta.persistence.*;
import org.apache.catalina.User;

@Entity
@Table(name = "ManagerTable1")
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long managerId;

    @OneToOne
    @JoinColumn(name = "user_Id", referencedColumnName = "id")
    private Users users;

    public long getManagerId() {
        return managerId;
    }

    public void setManagerId(long managerId) {
        this.managerId = managerId;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Manager{" +
                "managerId=" + managerId +
                ", users=" + users +
                '}';
    }
}
