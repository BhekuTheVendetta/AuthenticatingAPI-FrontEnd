import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface NetworkInfoResponse {
  macAddress: string;
  ipAddress: string;
  computerName: string;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkInfoService {
  private apiUrl = 'http://localhost:3001/networkInfo';

  constructor(private http: HttpClient) { }

  public getNetworkInfo(): Observable<NetworkInfoResponse> {
    return this.http.get<NetworkInfoResponse>(this.apiUrl);
  }
}