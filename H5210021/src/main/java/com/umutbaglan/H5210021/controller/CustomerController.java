package com.umutbaglan.H5210021.controller;


import com.umutbaglan.H5210021.models.requests.CustomerRequest;
import com.umutbaglan.H5210021.entity.Customer;
import com.umutbaglan.H5210021.models.requests.UpdateRequest;
import com.umutbaglan.H5210021.models.responses.CustomerResponse;
import com.umutbaglan.H5210021.models.responses.DeleteResponse;
import com.umutbaglan.H5210021.repository.CustomerRepository;
import org.hibernate.sql.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/addcustomer")
    public CustomerResponse addCustomer(@RequestBody CustomerRequest customerRequest){

        CustomerResponse customerResponse = new CustomerResponse();
        if (customerRequest.name == "" || customerRequest.surname == "" ||
                customerRequest.birth <= 0 || customerRequest.tel == "")
        {
            customerResponse.customer = null;
            customerResponse.message = "Müşteri eklenemedi. !!";
            customerResponse.status = false;
            return customerResponse;
        }
        Customer customer = new Customer(customerRequest.name,
                customerRequest.surname,
                customerRequest.birth,
                customerRequest.tel);
        customerResponse.customer = customer;
        try {
            customerRepository.save(customer);
        }catch (Exception e){
            customerResponse.customer = null;
            customerResponse.message = "Müşteri eklenemedi !!";
            customerResponse.status = false;
            return customerResponse;
        }
        customerResponse.message = "Müşteri başarılı şekilde eklendi !";
        customerResponse.status = true;
        return customerResponse;
    }

    @GetMapping("/getcustomer")
    public CustomerResponse getCustomer(int id){

        CustomerResponse customerResponse = new CustomerResponse();
        try{
            Customer customer = customerRepository.findById(id).get();

            customerResponse.customer = customer;
            customerResponse.message = "Müşteri getirildi !!";
            customerResponse.status = true;
            return customerResponse;

        }catch (Exception e){
            customerResponse.customer = null;
            customerResponse.message = "Müşteri bulunamadı !!";
            customerResponse.status = false;
            return customerResponse;
        }
    }

    @PutMapping("/updatecustomer")
    public CustomerResponse updateCustomer(@RequestBody UpdateRequest updateRequest){

        CustomerResponse customerResponse = new CustomerResponse();
        try{
            Customer customer = customerRepository.findById(updateRequest.id).get();
            if (updateRequest.name == "" || updateRequest.surname == "" ||
                    updateRequest.birth <= 0 || updateRequest.tel == "")
            {
                customerResponse.customer = null;
                customerResponse.message = "Değişiklikler kaydedilmedi !!";
                customerResponse.status = false;
                return customerResponse;
            }
            customer.setCustomerName(updateRequest.name);
            customer.setCustomerSurName(updateRequest.surname);
            customer.setBirthYear(updateRequest.birth);
            customer.setTelNo(updateRequest.tel);
            try{
                customer = customerRepository.save(customer);
            }catch(Exception e)
            {
                customerResponse.customer = null;
                customerResponse.message = "Değişiklikler kaydedilmedi !!";
                customerResponse.status = false;
                return  customerResponse;
            }
            customerResponse.customer = customer;
            customerResponse.message = "Değişiklikler kaydedildi !!";
            customerResponse.status = true;
            return customerResponse;
        }catch(Exception e){
            customerResponse.customer = null;
            customerResponse.message = "Müşteri bulunamadı !!";
            customerResponse.status = false;
            return customerResponse;
        }
    }

    @DeleteMapping("/deletecustomer")
    public DeleteResponse deleteCustomer(int id) {

        DeleteResponse deleteResponse = new DeleteResponse();
        try {
            customerRepository.deleteById(id);
        }
        catch(Exception e) {
            deleteResponse.status = false;
            deleteResponse.message = "Müşteri silinemedi !!";
            return  deleteResponse;
        }
        deleteResponse.status = true;
        deleteResponse.message = "Müşteri başarılı şekilde silindi !!";
        return deleteResponse;
    }

    @GetMapping("/getallcustomer")
    public List<Customer> getAllCustomer(){
        return (List<Customer>) customerRepository.findAll();
    }
}
