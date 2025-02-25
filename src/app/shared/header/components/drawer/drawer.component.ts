import { Component, Input, ViewChild } from '@angular/core';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'app-drawer',
  standalone: false,
  
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent{
  @Input('isDrawerVisible') isDrawerVisible! : boolean[];
  @ViewChild('drawerRef') drawerRef!: Drawer;
  
  closeCallback(event : any): void {
    this.drawerRef.close(event);
  }
}
