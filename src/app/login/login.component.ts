import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resdata: any;

  constructor(private http:HttpClient,private _router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(data:any){
    console.log(data.username);
    this.http.post('http://localhost:5000/api/login',data)
    .subscribe((result)=>{
      console.warn("result",result)
      this.resdata = result;
      console.log(this.resdata.message);
    if(this.resdata.message=='Login successful')
    {
      this._router.navigate(['/movie'],{ queryParams: { username: JSON.stringify(data.username) } });
    }
    else{
      this._router.navigate(['/register']);
    }
    })
    console.warn(data);
  }

}
