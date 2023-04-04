import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
declare var jQuery: any;
import { transition } from '../app/javaScriptFun.js';
export interface userTable {
  userId: number;
  userName: string;
  userDiscription: string;
  email: string;
  phoneNo: number;
  age: number;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test';
  searchTerm: string = '';
  page = 1;
  fileToUpload: any;
  imageUrl: any;
  userList: userTable[] = [
    {
      userId: 1,
      userName: "Prem Kumar",
      userDiscription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
      email: "Prem123@gmail.com",
      phoneNo: 2356456465,
      age: 30,
      image: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'
    },
    {
      userId: 2,
      userName: 'Prashant Kumar',
      userDiscription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      email: 'Prashant123@gmail.com',
      phoneNo: 2356456465,
      age: 25,
      image: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'
    },
    {
      userId: 3,
      userName: 'Mukul Kumar',
      userDiscription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      email: 'Mukul@gmail.com',
      phoneNo: 2356456465,
      age: 20,
      image: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'
    },
    {
      userId: 4,
      userName: 'Gaurav Kumar',
      userDiscription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      email: 'Gaurav123@gmail.com',
      phoneNo: 2356456465,
      age: 40,
      image: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'
    },
    {
      userId: 5,
      userName: 'saurav Kumar',
      userDiscription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      email: 'saurav123@gmail.com',
      phoneNo: 2356456465,
      age: 50,
      image: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'
    },
    {
      userId: 6,
      userName: 'Gopal Kumar',
      userDiscription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      email: 'Gopal123@gmail.com',
      phoneNo: 2356456465,
      age: 31,
      image: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'
    }

  ]
  toBeDeletedUserId: number | undefined;
  updateUserBtn: boolean = false;
  tobeUpdatedUserId: number | undefined;
  constructor(private formBuilder: FormBuilder,) { }
  ngOnInit(): void {
    transition();
  }
  /// Update User Form ////////////
  AddUserForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    email: new FormControl(''),
    number: new FormControl(),
    age: new FormControl(),
  });
  hideModal() {
    jQuery('#exampleModal').modal('hide');
    this.updateUserBtn = false;
  }

  openAddUserPopup() {
    jQuery('#exampleModal').modal('show');
  }

  deleteUser(userId: number) {
    jQuery('#deleteUser').modal('show');
    this.toBeDeletedUserId = userId;
  }
  deleteUserById() {
    const index = this.userList.findIndex((userData) => userData.userId == this.toBeDeletedUserId);
    this.userList.splice(index, 1);
    jQuery('#deleteUser').modal('hide');
  }
  closeDeletePopup() {
    jQuery('#deleteUser').modal('hide');
  }
  userFormData() {
    const uId = Math.random().toFixed(2);
    this.userList.unshift({
      userId: Number(uId),
      userName: String(this.AddUserForm.value.name),
      userDiscription: String(this.AddUserForm.value.description),
      email: String(this.AddUserForm.value.email),
      phoneNo: this.AddUserForm.value.number,
      age: this.AddUserForm.value.age,
      image: this.imageUrl
    });
  }
  addUser() {
    if (this.AddUserForm.value.name == "" || this.AddUserForm.value.description == ""
      || this.AddUserForm.value.email == "" || this.AddUserForm.value.number == "" || this.AddUserForm.value.age == "") {
      alert('Invalid Form');
      return;
    } else {
      this.userFormData();
      this.AddUserForm.reset();
      jQuery('#exampleModal').modal('hide');
      console.log(this.userList)
    }

  }

  editUserById(uId: number) {
    this.updateUserBtn = true;
    jQuery('#exampleModal').modal('show');
    this.tobeUpdatedUserId = uId;
    const index = this.userList.findIndex((userData) => userData.userId == uId);
    this.AddUserForm.patchValue({
      name: this.userList[index].userName,
      description: this.userList[index].userDiscription,
      email: this.userList[index].email,
      number: this.userList[index].phoneNo,
      age: this.userList[index].age,
    })
  }
  UpdateUser() {
    const index = this.userList.findIndex((userData) => userData.userId == this.tobeUpdatedUserId);
    this.userList.splice(index, 1);
    this.userFormData();
    this.AddUserForm.reset();
    this.hideModal();
  }


  handleFileInput(file: any) {
    this.fileToUpload = file.target.files.item(0);
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  //// for sorting 
  onSortClick(event: any) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.onSort()

    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
    }
    
  }

  onSort() {
    this.userList.sort(function(a, b){
      if(a.userName < b.userName) { return -1; }
      if(a.userName > b.userName) { return 1; }
      return 0;
  })
    // this.userList.sort((a, b) => (a.age < b.age) ? -1 : 1);
  }

}
