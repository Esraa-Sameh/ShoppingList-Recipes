
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]

})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;
    userSub : Subscription;
    constructor (private dataStorageService : DataStorageService, private authService: AuthService) {
    }
    ngOnInit(){
       this.userSub = this.authService.user.subscribe(user => {
           this.isAuthenticated = user? true : false;
       })
    }
    ngOnDestroy (){
        this.userSub.unsubscribe();
    }
    onSaveData(){
        this.dataStorageService.storeRecipes(); 
    }
    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }
}