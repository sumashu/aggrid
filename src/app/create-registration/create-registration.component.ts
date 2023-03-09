import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit{
 public packages:string[] = ['Monthly','Quaterly','Yearely'];
 public genders:string[] = ['Male','Female'];
 public importsntList:string[] = [
  'Toxic fat reduce',
  'Energy and endirance',
  'BULidng leN Muscles',
  'helithier digestve system',
  'siger creative body',
  'fitbess'
];

public registerForm!:FormGroup;

constructor(private fb:FormBuilder, private api:ApiService, private toastservice:NgToastService){

}

ngOnInit(): void {
  this.registerForm = this.fb.group({
       firstName:[],
       lastName:[],
       email:[],
       mobile:[],
       weight:[],
       height:[],
       bmi:[],
       bmiResult:[],
       gender:[],
       requireTrainer:[],
       package:[],
       important:[],
       havegymBefore:[],
       enquiryDate:[]
  })
  this.registerForm.controls['height'].valueChanges.subscribe(res=>{
    this.calculateBmi(res);
  })

}

submit(){
 //console.log(this.registerForm.value)
  this.api.postRegistartion(this.registerForm.value)
  .subscribe({next:(res)=>{
    this.toastservice.success({detail:"succses",summary:'Enquiery Added',duration:3000});
    this.registerForm.reset();
  },
  error: (e) => console.error("something went wrong",e),
})
}

calculateBmi(heightVal:number){
  const weight= this.registerForm.value.weight;
  const height = heightVal;
  const bmi = weight/(height * height);
  this.registerForm.controls['bmi'].patchValue(bmi);

  switch (true) {
    case bmi < 18.5:
      debugger;
      this.registerForm.controls['bmiResult'].patchValue("Underweight");
      break;

    case (bmi >= 18.5 && bmi < 25):
      this.registerForm.controls['bmiResult'].patchValue("Normal");
      break;

    case (bmi >= 25 && bmi < 30):
      this.registerForm.controls['bmiResult'].patchValue("OverWeight");
      break;

    default:
      this.registerForm.controls['bmiResult'].patchValue("obesity");
      break;
  }
}



}
