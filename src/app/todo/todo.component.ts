import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface Task{
  name:string;
  isUpdating: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks:Task[] = [];
  constructor() { 
    this.tasks = [

    ]
  }

  ngOnInit(): void {

  }

  handleSubmit(rcivdform:NgForm){
    let newTask :Task = {name : rcivdform.value.task, isUpdating : false};
    this.tasks.push(newTask);
    rcivdform.resetForm();

  }
  handleRemove(T:string){
    this.tasks = this.tasks.filter((Task:Task) => Task.name != T );

  }
  handleUpdate(t:Task){
    t.isUpdating = true;
  }
  handleChange(oldname:string,newTaskName:string){

    let updatedTask:Task = this.tasks.filter((t) => t.name === oldname)[0];
    updatedTask.name = newTaskName;
    updatedTask.isUpdating = false;
    
  }
}
