import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { user } from '../app';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  constructor(private userService: UserService) { }

  user: user = {
    id: 0,
    name: '',
    address: '',
    phone: ''
  };

  users: user[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

onSubmit(user: user) {
  if (user.id && user.id !== 0) {
    // Modo edición
    this.userService.updateUser(user).subscribe(updatedUser => {
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      this.resetForm();
    });
  } else {
    // Modo agregar
    // Elimina el ID antes de enviarlo al backend
    const { id, ...userWithoutId } = user;

    this.userService.addUser(userWithoutId as user).subscribe(newUser => {
      this.users.push(newUser);
      this.resetForm();
    });
  }
}


  editUser(selectedUser: user) {
    // Clona los datos para que no se modifiquen directamente en la lista
    this.user = { ...selectedUser };
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }

  resetForm() {
    this.user = {
      id: 0,
      name: '',
      address: '',
      phone: ''
    };
  }

}
