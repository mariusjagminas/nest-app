import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  private queryList: Array<string> =[]

  addQuery(query: string){
    this.queryList.push(query)
  }

  getList(): string{
    return this.queryList.toString();
  }
}
