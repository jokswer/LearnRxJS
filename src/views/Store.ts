import { observable, action } from "mobx";
import { Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
} from "rxjs/operators";
import request$ from "../services/http";

class MainStore {
  value = new Subject<string>()

  @observable
  public companiesIsloading = false;

  @observable
  public companies: TSearchCompany[] = [];

  @observable
  public companyProfile: TCompanyProfile | undefined;

  public handleSearchEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.value.next(event.target.value)
  }

  public subscribeSearch = () => {
    this.value
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => (this.companiesIsloading = true)),
        switchMap((value: string) => this.searchCompany(value)),
        tap(() => (this.companiesIsloading = false))
      )
      .subscribe((result: TSearchCompany[]) => (this.companies = result));
  };

  public unsubscribeSearch = () => {
    this.value.unsubscribe()
  }

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
