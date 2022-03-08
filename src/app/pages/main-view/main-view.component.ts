import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {



  constructor() { }

  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      "some random ideasddddddddddddddd ddddd dddddddddd ddddddddd ddddddddddd ddddddddddd ddddddddddd ddddddddddddddd",
      "this another random idea",
      "build an awesome application",

    ]),
    new Column('Research', [
      "wikipedia",
      "tsddd",
      "rrr"
    ]),
    new Column('Todo', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]),

    new Column('Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ])
  ])

  status: boolean[] = [];
  inputValue: string[] = [];
  ngOnInit(): void {

    for (var i = 0; i < this.board.columns.length; i++) {
      this.status.push(false);
      this.inputValue.push('');
    }
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deleteTask(_task: string, _column: number) {
    const index: number = this.board.columns[_column].tasks.indexOf(_task);
    if (index !== -1) {
      this.board.columns[_column].tasks.splice(index, 1);
    }

  }



  toggleAdd(_column: number) {
    this.status[_column] = !this.status[_column];
  }


  addTask(_column: number,) {


    if (this.inputValue[_column] != '') {
      this.board.columns[_column].tasks.push(this.inputValue[_column]);
      this.inputValue[_column] = '';
    }
  }



}
