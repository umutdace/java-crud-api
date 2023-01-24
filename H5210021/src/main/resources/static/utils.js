$(document).ready(function () {
fetch("http://localhost:8080/getallcustomer")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        var injectHTML = '';
        for (const customer of data){
             injectHTML += '<tr>';
             injectHTML += '<td>'+customer['id']+'</td>';
             injectHTML += '<td>'+customer['customerName']+'</td>';
             injectHTML += '<td>'+customer['customerSurName']+'</td>';
             injectHTML += '<td>'+customer['birthYear']+'</td>';
             injectHTML += '<td>'+customer['telNo']+'</td>';
             injectHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showEditBox('+customer['id']+')">Güncelle</button>';
             injectHTML += '<button type="button" class="btn btn-outline-danger" onclick="deleteCustomer('+customer['id']+')">Sil</button></td>';
             injectHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = injectHTML;
      });
});

function deleteCustomer(id){
console.log(id);
fetch('http://localhost:8080/deletecustomer?id='+id,{
        method: 'DELETE',
    }).then((response) => {
        if (response.ok)
            return response.json();
    }).then((data) => {
        if (data.status == true){
            ShowSucces("Kullanıcı Silindi");
            getListCustomer();
        }
        else
            ShowError("Kullanıcı Silinemedi");
        })
        .catch(() => {
            ShowError("Bir şeyler ters gitti...")
        });
}

function addCustomer(name,surname,birth,tel){
        const customer = {
            "name": name,
            "surname": surname,
            "birth": birth,
            "tel":tel
        };
        fetch('http://localhost:8080/addcustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.status == false)
                    ShowError(data.message);
                else{
                    ShowSucces(data.message);
                    getListCustomer();
                }
            })
            .catch(() => {
                ShowError("Bir şeyler ters gitti...")
            });
 }

 function updateCustomer(customer) {
    fetch('http://localhost:8080/updatecustomer', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.status == false)
                    ShowError(data.message);
                else{
                    ShowSucces(data.message);
                    getListCustomer();
                }
            })
            .catch(() => {
                ShowError("Bir şeyler ters gitti...")
            });
 }


  function getListCustomer(){
     fetch("http://localhost:8080/getallcustomer")
         .then((response) => {
             if (response.ok) {
             return response.json();
             }
         })
         .then((data) => {
             var injectHTML = '';
             for (const customer of data){
                 injectHTML += '<tr>';
                 injectHTML += '<td>'+customer['id']+'</td>';
                 injectHTML += '<td>'+customer['customerName']+'</td>';
                 injectHTML += '<td>'+customer['customerSurName']+'</td>';
                 injectHTML += '<td>'+customer['birthYear']+'</td>';
                 injectHTML += '<td>'+customer['telNo']+'</td>';
                 injectHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showEditBox('+customer['id']+')">Güncelle</button>';
                 injectHTML += '<button type="button" class="btn btn-outline-danger" onclick="deleteCustomer('+customer['id']+')">Sil</button></td>';
                 injectHTML += "</tr>";
             }
             document.getElementById("mytable").innerHTML = injectHTML;
         });
  }

function showAddBox() {
  Swal.fire({
    title: 'Müşteri Ekle',
    html:
      '<input id="name" class="swal2-input" placeholder="Ad">' +
      '<input id="lname" class="swal2-input" placeholder="Soyad">' +
      '<input id="birth" class="swal2-input" placeholder="Doğum Yılı">' +
      '<input id="telNo" class="swal2-input" placeholder="Telefon">',
    focusConfirm: false,
    preConfirm: () => {
      const name = document.getElementById("name").value;
      const surname = document.getElementById("lname").value;
      const birth = document.getElementById("birth").value;
      const tel = document.getElementById("telNo").value;

      addCustomer(name,surname,birth,tel);
    }
  })
}

function showEditBox(id) {
  fetch('http://localhost:8080/getcustomer?id='+id)
      .then((response) => {
          if (response.ok)
              return response.json();
      }).then((data) => {
          if (data.status == true){
              Swal.fire({
                title: 'Müşteri Düzenle',
                html:
                       '<input id="name" class="swal2-input" placeholder="Ad" value="'+data.customer['customerName']+'">' +
                       '<input id="lname" class="swal2-input" placeholder="Soyad" value="'+data.customer['customerSurName']+'">' +
                       '<input id="birth" class="swal2-input" placeholder="Doğum Yılı" value="'+data.customer['birthYear']+'">' +
                       '<input id="telNo" class="swal2-input" placeholder="Telefon" value="'+data.customer['telNo']+'">',
                focusConfirm: false,
                preConfirm: () => {
                    const name = document.getElementById("name").value;
                    const surname = document.getElementById("lname").value;
                    const birth = document.getElementById("birth").value;
                    const tel = document.getElementById("telNo").value;
                    const customer = {
                        "id": id,
                        "name": name,
                        "surname": surname,
                        "birth": birth,
                        "tel": tel,
                    };
                    updateCustomer(customer);
                }
                });
          }
          else
              ShowError(data.message);
          }).catch(() => {
            ShowError("Bir şeyler ters gitti...")
          });
}

function showCustomerBox(id){
fetch('http://localhost:8080/getcustomer?id='+id)
      .then((response) => {
          if (response.ok)
              return response.json();
      }).then((data) => {
          if (data.status == true){
              Swal.fire({
                title: 'Müşteri Bilgileri',
                html:
                       '<input id="name" class="swal2-input" placeholder="Ad" disabled value="'+data.customer['customerName']+'">' +
                       '<input id="lname" class="swal2-input" placeholder="Soyad" disabled value="'+data.customer['customerSurName']+'">' +
                       '<input id="birth" class="swal2-input" placeholder="Doğum Yılı" disabled value="'+data.customer['birthYear']+'">' +
                       '<input id="telNo" class="swal2-input" placeholder="Telefon" disabled value="'+data.customer['telNo']+'">',
                });
          }
          else
              ShowError(data.message);
          }).catch(() => {
            ShowError("Bir şeyler ters gitti...")
          });
}

function showInfoBox() {
  Swal.fire({
    title: 'Müşteri Ekle',
    html:'<input id="customerId" class="swal2-input" placeholder="Müşteri Id Giriniz">',
    focusConfirm: false,
    preConfirm: () => {
      const id = document.getElementById("customerId").value;
      showCustomerBox(id);
    }
  })
}

 function ShowError(msg){
      Swal.fire({
          title: 'Hata',
          icon: 'error',
          text: msg
      });
  }

  function ShowSucces(msg){
      Swal.fire({
          title: 'Başarılı',
          icon: 'success',
          text: msg
      });
  }


