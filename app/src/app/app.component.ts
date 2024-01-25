import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { CommonService } from './common.service';
import { NetworkInfoService } from './network-info.service';

// Move the email and username validation functions outside the AppComponent class
function validateEmail(email: string): boolean {
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateUsername(username: string): boolean {
 
  const usernamePattern = /^[a-zA-Z0-9_]{4,}$/;
  return usernamePattern.test(username);
}

function validatePassword(password: string): string[] {
  const missingChars: string[] = [];

  if (!/(?=.*\d)/.test(password)) {
    missingChars.push("a digit");
  }

  else if (!/(?=.*[a-z])/.test(password)) {
    missingChars.push("a lowercase letter");
  }

  else if (!/(?=.*[A-Z])/.test(password)) {
    missingChars.push("an uppercase letter");
  }

  else if (!/(?=.*[!@#$%^&*])/.test(password)) {
    missingChars.push("a special character (!@#$%^&*)");
  }

  else if (password.length < 8) {
    missingChars.push("at least 8 characters");
  }

  return missingChars;
}

interface NetworkInfoResponse {
  macAddress: string;
  ipAddress: string;
  computerName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  computerName: string = '';
  UserName: string = '';
  userIP: string = '';
  signupUsers: any[] = [];
  signupObj: any = {
    firstName:'',
    lastName:'',
    jobPosition:'',
    userName: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    userName: '',
    Password: ''
  };
  passwordRequirements = 'Password must contain the following:';

  ip='';
  title: any;
macAddress: string = '';
 ipAddress: string = '';
 
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private commonService: CommonService, private networkInfoService: NetworkInfoService) { }
    
  
async ngOnInit(): Promise<void> {
    const localData = localStorage.getItem('signupUsers');
    if (localData != null) {
        this.signupUsers = JSON.parse(localData);
    }
    this.commonService.getIp().subscribe((data:any)=>{
            console.log('UserIP:', this.userIP, data);
            this.ip=data.ip
    });
    
    this.networkInfoService.getNetworkInfo().subscribe((response: NetworkInfoResponse) => {
      this.macAddress = response.macAddress;
      this.ipAddress = response.ipAddress;
      this.computerName = response.computerName;
    });

    this.UserName = await this.getUsername() || '';
    this.computerName = this.getComputerName().computerName;
    console.log('Username:', this.UserName);
    console.log('Computer Name:', this.computerName);
}
private getUsername(): string {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  return `User Agent: ${userAgent}, Platform: ${platform}`;
}

private getComputerName(): {computerName: string, platform: string} {
  const computerName = window.location.hostname;
  let platform = navigator.platform;
  console.log("Platform: ", platform);

  console.log('Computer Name:', computerName);
  return {computerName, platform};
}

  onSignUp() {
    const missingChars = validatePassword(this.signupObj.password);
    if (missingChars.length > 0) {
      const errorMessage = this.passwordRequirements + " " + missingChars.join(", ");
      alert(errorMessage);
      return;
    }

    // Proceed with signup if all requirements are met
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
    };
  }

  onLogin() {
    if (!validatePassword(this.loginObj.Password)) {
      const missingChars = validatePassword(this.loginObj.Password);
      const errorMessage = this.passwordRequirements + " " + missingChars.join(", ");
      alert(errorMessage);
      return;
    }
  }
}