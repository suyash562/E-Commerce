import { Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'app-drawer',
  standalone: false,
  
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent implements DoCheck{
  ngDoCheck(): void {
    console.log(`input value changed to ${this.isDrawerVisible}`);
  }
  @Input('isDrawerVisible') isDrawerVisible! : boolean[];
  @Output() drawerDisabled : EventEmitter<void> = new EventEmitter();
  @ViewChild('drawerRef') drawerRef!: Drawer;
  
  closeCallback(event : any): void {
    this.drawerRef.close(event);
    this.drawerDisabled.emit();
  }
}
