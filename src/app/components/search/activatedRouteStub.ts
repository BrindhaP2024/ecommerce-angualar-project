import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export class ActivatedRouteStub {

  private queryParamsSubject = new BehaviorSubject<any>({});
  queryParams = this.queryParamsSubject.asObservable();

  setQueryParams(params: any) {
    this.queryParamsSubject.next(params);
  }
}
