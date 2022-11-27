import { Component } from '@angular/core';
import { EnrollmentService } from './enrollment.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tdf';
  topics =["Angular", "React", "Vue"];
  userModel = new User('Rob', 'rob@test.com', 3332224455, '', 'morning', true);

  topicHasError = true;

  constructor(private _enrollmentService:EnrollmentService);

  validateTopic(value: string){
    if(value == 'default'){
      this.topicHasError = true;
    }else{
      this.topicHasError = false;
    }

  }
  

  onSubmit(){
    this._enrollmentService.enroll(this.userModel).subscribe(
      data => console.log('Success!'),
      error => console.error('Error!', error)
    )
    // console.log(this.userModel);
  }
}
