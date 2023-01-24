package com.umutbaglan.H5210021.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String customerName;
    private String customerSurName;
    private int birthYear;
    private String telNo;

    public Customer(String customerName, String customerSurName, int birthYear, String telNo) {
        this.customerName = customerName;
        this.customerSurName = customerSurName;
        this.birthYear = birthYear;
        this.telNo = telNo;
    }
}
