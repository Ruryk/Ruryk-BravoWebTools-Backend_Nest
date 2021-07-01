import { DaysDto } from './days.dto';

export class CustomersDto {
  customerNo: string;
  name: string;
  address: string;
  days: DaysDto;
  notify: boolean;
  contactName: string;
  contactPhone: string;
  productsCodes: string[];
}


// 'BB-123': {
//   customerNo: 'BB-123',
//     name: 'Burger Bar',
//     address: 'Main Street, 1234 Zurich',
//     days: {
//     Mon: true,
//       Tue: false,
//       Wed: true,
//       Thu: false,
//       Fri: false,
//       Sat: true,
//       Sun: false
//   },
//   notify: false,
//     contactName: 'Vlad',
//     contactPhone: '0639999999',
//     productsCodes: ['APP123', 'TOM53', 'CUC997']
// },
// 'GZ-889': {
//   customerNo: 'GZ-889',
//     name: 'Gyoza SS',
//     address: 'Second Street 3421 Geneva',
//     days: {
//     Mon: false,
//       Tue: true,
//       Wed: false,
//       Thu: false,
//       Fri: true,
//       Sat: false,
//       Sun: true
//   },
//   notify: false,
//     contactName: 'Artem',
//     contactPhone: '0639999999',
//     productsCodes: ['APP123', 'TOM53', 'CUC997']
// }
