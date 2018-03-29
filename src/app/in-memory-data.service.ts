import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      {
        id: 11,
        name: 'Mr. Nice',
        surname: 'surname1111',
        sex: 'Male',
        city : "Warszawa",
        country: "Poland"
      },
      {
        id: 12,
        name: 'Narco',
        surname: 'surname3222',
        sex: 'Male',
        city : "Zakopane",
        country: "Poland"
      },
      {
        id: 13,
        name: 'Bombasto',
        surname: 'surname33',
        sex: 'Male',
        city : "Gdynia",
        country: "Poland"
      },
      {
        id: 14,
        name: 'Celeritas' ,
        surname: 'surname444',
        sex: 'Male',
        city : "Berlin",
        country: "Germany"
      },
    ];
    return {users};
  }
}
