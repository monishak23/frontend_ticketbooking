import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
   resdata: any;

  constructor(private http:HttpClient,private _router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(data:any){
    console.log("entry");
    this.http.post('http://localhost:5000/api/register',data)
    .subscribe((result:any)=>{
      console.warn("result",result)
      this.resdata = result;
      console.log(this.resdata.message);
    if(this.resdata.message=='User added successfully')
    {
      
      this._router.navigate(['/movie']);
    }
    else{
      this._router.navigate(['/register']);
    }
    })
    console.warn(data);
  }

}
