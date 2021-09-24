// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  firebaseConfig : {
    apiKey: "AIzaSyAfyiEMPw0cOXs0ww2kdjvhKP5z05rkVa4",
    authDomain: "minor-project-blockchain.firebaseapp.com",
    projectId: "minor-project-blockchain",
    storageBucket: "minor-project-blockchain.appspot.com",
    messagingSenderId: "289119061569",
    appId: "1:289119061569:web:a23112e6a34457cf7aa8c0",
    measurementId: "G-F4899VQBY0"
},

  listedAddress : {
    "0x3aa821cEE6194C4aD7e3F3d6E393F646D1Cd65Db" : "Owner",
    "0x45cCBbFdc58d30954ef8f2B925C83A6F6043f48E": "Farmer",
    "0x18BfE45724Ba7f3517F6EeE2fd9EaA67C95C5465": "Producer",
    "0x9ABdE84309c86016bA5377987951a5711d58a238" : "Auditor",
    "0x9062dE77e164065434bB37f34D6eB3411E504CdC": "Distributor",
    "0xb163EA408E9262331CaD20DA227555d6cf9d85A0" : "Consumer",
  },

  rawItemState : {
    Planted : 1 ,
    Harvested : 2,
    Inspected : 3,
    Processed : 4, 
  },

  finishiedItemState : {
    Booked:     1,
    Produced:   2,
    Certified:  3,
    Packaged:   4,
    ForSale:    5,
    Sold :      6,
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
