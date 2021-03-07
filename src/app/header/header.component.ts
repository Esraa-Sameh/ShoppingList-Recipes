
import { Component, Output, EventEmitter } from '@angular/core';


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]

})
export class HeaderComponent {
    collapsed = true;
    @Output() public navClick= new EventEmitter();

    constructor () {}

    onNavClick (value:string){
        this.navClick.emit(value)
    }
}