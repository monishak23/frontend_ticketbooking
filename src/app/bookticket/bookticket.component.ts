import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.css']
})
export class BookticketComponent  {

  rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  seatsPerRow: number[] = [1, 2, 3, 4, 5,6,7]; // Adjust as per your theater layout
  seatSelected: boolean[][] = [];
  movieData: any;
  seat:any[] =[];
  seatlist:any[] =[];
   resdata: any;
  data: any;
  username: any;
  message: any;
  constructor(private http:HttpClient,private _router:ActivatedRoute,private router:Router) {
    this.initializeSeats();
   }

   ngOnInit() {
    // Retrieve the movie data from the route parameters
    this._router.queryParams.subscribe(params => {
      if (params['movieData']) {
        this.movieData = JSON.parse(params['movieData']);
        this.username = JSON.parse(params['username']);
      }
      console.log(this.movieData)
      console.log(this.username)
    });
  }

   initializeSeats() {
    this.rows.forEach(() => {
      const rowSeats: boolean[] = [];
      this.seatsPerRow.forEach(() => {
        rowSeats.push(false);
      });
      this.seatSelected.push(rowSeats);
    });
  }

  toggleSeat(row: any, col: any) {
    this.seatSelected[row][col] = !this.seatSelected[row][col];
          if(row == 0)
            row = 'A';
          if(row == 1)
            row = 'B';
          if(row == 2)
            row = 'C';
          if(row == 3)
            row = 'D';
          if(row == 4)
            row = 'E';
          if(row == 5)
            row = 'F';
          col = col+1
          this.seat = (row +col).toString();
          this.seats(this.seat);

  }
  seats(seat: any) {
    this.seatlist.push(seat); // Add the seat value to the seatList array
  }
  navigate(){
    this.data = {
      seats: [],
      showtiming: "2023-09-26T14:00:00.000+00:00",
      moviename: "",           // Initialize these properties with empty values
      theatrename: "",
      theatrelocation: "",
      releasedate: "",
      username:"",
    };
  this.data.moviename = this.movieData['movie name'];
  this.data.theatrename = this.movieData['theatre name'];
  this.data.theatrelocation = this.movieData['theatre location'];
  this.data.releasedate = this.movieData['release date'];

  // Set seats and showtiming
  this.data.seats = this.seatlist;
  this.data.username = this.username;

  console.log(this.data);
    console.log(this.data)
    this.http.post('http://localhost:5000/api/book',this.data)
    .subscribe((result:any)=>{
      console.warn("result",result)
      this.resdata = result;
      console.log(this.resdata.message);
      if(this.resdata.message=='Show booked successfully')
    {
        this.message = 'Booking success!'
        setTimeout(() => {
          this.router.navigate(['/register']); 
        }, 2000);
    }
    else{
      this.message = 'Booking failed'
    }
    })
  }
    
}
