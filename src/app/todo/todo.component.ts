import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';


export interface Task{
  name:string;
  isUpdating: boolean;
  isVisible :boolean;
}

enum SortOptions{
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks:Task[] = [];

  readonly TASKS_KEY = 'tasks';

  SortEnum = SortOptions;
  sort:SortOptions = SortOptions.NONE;

  constructor() { 
    this.tasks = [

    ]
  }

  ngOnInit(): void {
    let savedTasks = localStorage.getItem(this.TASKS_KEY);
    if (savedTasks != null) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  handleSubmit(rcivdform:NgForm){
    let newTask :Task = {name : rcivdform.value.task, isUpdating : false,isVisible : true};
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

  handleSort(SD:SortOptions){
    

    if (SD === this.sort) {
      this.sort = SortOptions.NONE;
      return;
    }

    this.sort = SD;

    switch (SD) {
      case SortOptions.ASC:
         this.tasks = this.tasks.sort((a:Task,b:Task) => {
          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();

          if (aLower < bLower) {
            return -1;
          }
          if (aLower > bLower) {
            return 1;
          }
          return 0;
         });
        break;

        case SortOptions.DESC:
          this.tasks = this.tasks.sort((a:Task,b:Task) => {
            let aLower = a.name.toLowerCase();
            let bLower = b.name.toLowerCase();
  
            if (aLower < bLower) {
              return 1;
            }
            if (aLower > bLower) {
              return -1;
            }
            return 0;
           });
        break;

      case SortOptions.NONE:
        
      default:
        break;
    }
  }

  HandleSearch(s:string){

    this.tasks.map((task) => {
      task.isVisible = (task.name.includes(s)); 
    });
  }

  handleSave():void{
    localStorage.setItem('tasks',JSON.stringify(this.tasks));
  }
}
