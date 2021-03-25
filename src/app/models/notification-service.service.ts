import { ApiResponse } from './../models/api-response.model';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, throwError } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { NotificationMessage } from '../models/notification-message';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  private notificationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();
  messagingBaseUrl = environment.apiMessagingUrl;
  authBaseUrl = environment.apiBaseUrl;
  notifications = {
    status: 0,
    top: null,
    seen: null,
    unseen: null,
    all: null,
    important: null
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.bearerToken,
    })
  };

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private authService: AuthenticationService,
    private errorHandler: ErrorHandlerService) {
    this.notificationSubject.subscribe((notification: NotificationMessage) => {
      switch (notification.type) {
        case NotificationType.success:
          this.toastrService.success(notification.message);
          break;
        case NotificationType.error:
          this.toastrService.error(notification.message);
          break;
        case NotificationType.warning:
          this.toastrService.warning(notification.message);
          break;
        case NotificationType.info:
          this.toastrService.info(notification.message);
          break;
        default:
        case NotificationType.info:
          this.toastrService.info(notification.message);
          break;
      }
    }, error => {
      console.error("Error when Processing Notification Message.")
    });

    // this.messagingBaseUrl = 'http://localhost:8080/messageserv/api/v1'
    // this.authBaseUrl = 'http://localhost:8080/authserv/api/v1'
  }


  public showNotification(message: NotificationMessage) {
    this.notificationSubject.next(message);
  }

  public setUMID(mid: string) {
    return this.http.put(this.messagingBaseUrl + '/update/user/mid/' + this.authService.getCurrentUserId + "?mid=" + mid, {}, this.httpOptions).pipe(
      map((response: ApiResponse) => {
        return response;
      }),
      catchError((error) => {
        let errorMessage = error.error_description;
        console.log(errorMessage);
        return throwError("Something Went Wrong");
      })
    );
  }

  public pushNotification(notification: Notification) {
    return this.http.post(this.messagingBaseUrl + '/push/notification/' + this.authService.getCurrentUserId, notification, this.httpOptions).pipe(
      map((response: ApiResponse) => {
        return response;
      }),
      catchError((error) => {
        let errorMessage = error.error_description;
        console.log(errorMessage);
        return throwError("Something Went Wrong");
      })
    );
  }

  public markNotificationAsSeen(notificationId) {
    return this.http.put(this.messagingBaseUrl + '/notification/mark/seen/' + notificationId, {}, this.httpOptions).pipe(
      map((response: ApiResponse) => {
        return response;
      }),
      catchError((error) => {
        let errorMessage = error.error_description;
        console.log(errorMessage);
       
        return throwError("Something Went Wrong");
      })
    );
  }

  public getNotifications() {
    return this.http.get(this.messagingBaseUrl + '/notifications/base/' + this.authService.loginToken?.userId, this.httpOptions).pipe(
      map((response: ApiResponse) => {
        if (response.success)
          this.notifications = response.payload
        this.notifications.status = 1
        return response;
      }),
      catchError((error) => {
        console.log("Notification Error: ",error);
        let errorMessage = error.error.message !== undefined ? error.error.message : error.statusText;
        console.log(errorMessage);
       
        this.notifications.status = -1
        return throwError("Something Went Wrong");
      }))
  }

  public refresh(){
    return this.getNotifications();
  }
  public clearAll(){
      this.notifications.all=null;
      this.notifications.top=null;
      this.notifications.important=null;
      this.notifications.seen=null;
      this.notifications.unseen=null;
      return this.http.put(this.messagingBaseUrl + '/notification/clear/all/' + this.authService.getCurrentUserId, {}, this.httpOptions).pipe(
        map((response: ApiResponse) => {
          console.log(response)
          return response;
        }),
        catchError((error) => {
          let errorMessage = error.error_description;
          console.log(errorMessage);
         
          return throwError("Something Went Wrong");
        })
      );

  }
  public markAllAsRead(){
    document.querySelectorAll('.table-row').forEach((element)=>{
      element.classList.remove('NS')
      element.classList.add('SE')
    });
    return this.http.put(this.messagingBaseUrl + '/notification/mark/all/seen/' + this.authService.getCurrentUserId, {}, this.httpOptions).pipe(
      map((response: ApiResponse) => {
        return response;
      }),
      catchError((error) => {
        let errorMessage = error.error_description;
        console.log(errorMessage);
       
        return throwError("Something Went Wrong");
      })
    );
  }
}