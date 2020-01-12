import { observable, action } from "mobx";
import { of, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
  share
} from "rxjs/operators";
import request$ from "../services/http";

class MainStore {
  @observable
  public companiesIsloading = false;

  @observable
  public companies: TSearchCompany[] = [];

  @observable
  public companyProfile: TCompanyProfile | undefined;

  @action
  public handleSearchEvent = (event: any) => {
    event
      .pipe(
        // map(event => event.currentTarget.value),
        debounceTime(5000),
        tap((e)=> console.log(e)),
        // distinctUntilChanged(),
        tap(() => (this.companiesIsloading = true)),
        switchMap((value: string) => this.searchCompany(value)),
        tap(() => (this.companiesIsloading = false))
      )
      .subscribe((result: any) => (this.companies = result));
  };

  @action
  private searchCompany = (name: string) => {
    return request$<TSearchCompany[]>(
      `symbol/search/autocomplete?query=${name}&limit=20`
    );
  };

  @action
  public receiveCompanyProfile = (symbol: string) => {
    request$<TCompanyProfile>(`company/profile/${symbol}`).subscribe({
      next: response => (this.companyProfile = response)
    });
  };
}

export default new MainStore();
export interface IMainStore extends MainStore {}