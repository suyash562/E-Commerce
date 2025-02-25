import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options',
  standalone: false,
  
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent implements OnInit{
  criteria!: string;
  selectedSortingOption! : { name: string, code: string};
  sortOrder : { name: string, code: string}[] = []
  @Output() sortEvent : EventEmitter<{criteria : string, order : string}> = new EventEmitter();

  ngOnInit() {
    this.sortOrder = [
        { name: 'Low to High', code: 'LH' },
        { name: 'High to Low', code: 'HL' },
    ];
  }

  sortOptionSelected(){
    if(this.criteria && this.selectedSortingOption){      
      this.sortEvent.emit({criteria : this.criteria, order : this.selectedSortingOption.code});
    }
  }
}
