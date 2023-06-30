import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveStreamEvent } from '../models/liveStreamEvent';
import { LiveStreamService } from '../services/livestream.service';

@Component({
  selector: 'app-studio-livestream',
  templateUrl: './studio-livestream.component.html',
  styleUrls: ['./studio-livestream.component.css']
})
export class StudioLivestreamComponent implements OnInit {
  // liveStream:LiveStreamEvent={};
  constructor(private _snackbar:MatSnackBar, private fb:FormBuilder,private liveStream:LiveStreamService) { }

  ngOnInit(): void {  
    this.liveStreamForm.controls['guests'].valueChanges.subscribe((guestEmails)=>{
      this.guestList=guestEmails?.split(',');
    })
  }

  liveStreamForm=this.fb.group({
    eventTitle:['',[Validators.required,Validators.maxLength(100)]],
    eventDate:['',[Validators.required]],
    fromTime:['',[Validators.required]],
    toTime:['',[Validators.required]],
    description:[''],
    guests:['',[Validators.required,this.checkIfGuestEmailsAreValid]]
  });

  minDate:Date=new Date();
  timeValues:string[]=["00:00", "00:15", "00:30", "00:45", 
  "01:00", "01:15", "01:30", "01:45", 
  "02:00", "02:15", "02:30", "02:45", 
  "03:00", "03:15", "03:30", "03:45", 
  "04:00", "04:15", "04:30", "04:45", 
  "05:00", "05:15", "05:30", "05:45", 
  "06:00", "06:15", "06:30", "06:45", 
  "07:00", "07:15", "07:30", "07:45", 
  "08:00", "08:15", "08:30", "08:45", 
  "09:00", "09:15", "09:30", "09:45", 
  "10:00", "10:15", "10:30", "10:45", 
  "11:00", "11:15", "11:30", "11:45", 
  "12:00", "12:15", "12:30", "12:45", 
  "13:00", "13:15", "13:30", "13:45", 
  "14:00", "14:15", "14:30", "14:45", 
  "15:00", "15:15", "15:30", "15:45", 
  "16:00", "16:15", "16:30", "16:45", 
  "17:00", "17:15", "17:30", "17:45", 
  "18:00", "18:15", "18:30", "18:45", 
  "19:00", "19:15", "19:30", "19:45", 
  "20:00", "20:15", "20:30", "20:45", 
  "21:00", "21:15", "21:30", "21:45", 
  "22:00", "22:15", "22:30", "22:45", 
  "23:00", "23:15", "23:30", "23:45"]
  guestList?:string[]=[];

  get eventTitle(){
    return this.liveStreamForm.get('eventTitle'); 
  }
  get eventDate(){
    return this.liveStreamForm.get('eventDate'); 
  }
  get fromTime(){
    return this.liveStreamForm.get('eventTitle'); 
  }
  get toTime(){
    return this.liveStreamForm.get('toTime'); 
  }
  get description(){
    return this.liveStreamForm.get('description'); 
  }
  get guests(){
    return this.liveStreamForm.get('guests'); 
  }

  // Custom Email Validations 
  checkIfGuestEmailsAreValid(c: AbstractControl) {
    if (c.value !== '') {
      const emailString = c.value;
      const emails = emailString.split(',').map((e: string) => e.trim());
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const anyInvalidEmail = emails.every((e: string) => e.match(emailRegex) !== null);
      if (!anyInvalidEmail) {
        return { invalidGuestEmails: true }
      }
    }
    return null;
  }
onSubmit(){
  let liveStream:LiveStreamEvent=this.liveStreamForm.value as LiveStreamEvent;
  this.liveStream.addLiveStreamEvent(liveStream).subscribe({
    next:data=>{
      this._snackbar.open("Congrats!!You have submiited the form!!","success",{
        duration:5000,
        panelClass:['mat-toolbar','mat-primary']
      })
    },
    error:errors=>{
      this._snackbar.open("Failed to register user !! Please Try Again Later","Failure",{
        duration:3000,
        panelClass:['mat-toolbar','mat-accent']
      })
    }
  })
}

}
