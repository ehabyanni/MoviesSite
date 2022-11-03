import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MoviesSite';

  isLoggedIn = false;
  username:string = "";

  constructor(private tokenStorage:TokenStorageService , private route:Router){}

  
  ngOnInit():void{
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser();
      this.username = user.username;
    }
    
  }
  logout(): void {
    this.tokenStorage.signOut();
    this.route.navigate(['login']);
  }

}
