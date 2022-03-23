import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks:string[] = [];
  constructor() { 
    this.tasks = [

    ]
  }

  ngOnInit(): void {

  }

  handleSubmit(rcivdform:NgForm){
    let newTask = rcivdform.value.task;
    this.tasks.push(newTask);
    rcivdform.resetForm();

  }
}
