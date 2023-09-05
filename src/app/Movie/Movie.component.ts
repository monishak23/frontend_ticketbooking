import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-Movie',
  templateUrl: './Movie.component.html',
  styleUrls: ['./Movie.component.css']
})
export class MovieComponent implements OnInit {

  username: any;

  

  constructor(private http:HttpClient,private _router:Router,private router:ActivatedRoute) { }
  moviesData:any;
  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      if (params['username']) {
        this.username = JSON.parse(params['username']);
      }
      console.log(this.username)
    });
    this.http.get(`http://localhost:5000/api/movies`).subscribe((allData: any) => {
      console.log(allData);
  
      // Check if allData is an object, and if so, convert it to an array.
      if (allData && typeof allData === 'object') {
        this.moviesData = Object.values(allData); 
        // Convert the object values to an array
        console.log(this.moviesData[0])
      } else {
        this.moviesData = []; // Set an empty array as a fallback
      }
    });
  }

  navigate(movie : any){
    console.log(movie);
    this._router.navigate(['/booking'],{ queryParams: 
      { movieData: JSON.stringify(movie),
        username: JSON.stringify(this.username) }
       
     });
  }

 

 
 









}
