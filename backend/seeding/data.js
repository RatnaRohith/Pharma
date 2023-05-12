
const medicines =[
  {
    name: 'Aspirin',
    quantity: 100,
    expiry_date: '2023-06-30',
    store: 'Tunstall',
    requiresIdVerification: true
  },
  {
    name: 'Aspirin',
    quantity: 50,
    expiry_date: '2022-12-31',
    store: 'Burslem',
    requiresIdVerification: false
  },
  {
    name: 'Paracetamol',
    quantity: 200,
    expiry_date: '2024-05-31',
    store: 'Fenton',
    requiresIdVerification: false
  },
  {
    name: 'Ibuprofen',
    quantity: 150,
    expiry_date: '2023-03-31',
    store: 'Longton',
    requiresIdVerification: true
  },
  {
    name: 'Loratadine',
    quantity: 80,
    expiry_date: '2023-09-30',
    store: 'Hanley',
    requiresIdVerification: false
  },
  {
    name: 'Cetirizine',
    quantity: 120,
    expiry_date: '2022-11-30',
    store: 'Stoke',
    requiresIdVerification: false
  },
  {
    name: 'Fluoxetine',
    quantity: 30,
    expiry_date: '2024-07-31',
    store: 'Stoke',
    requiresIdVerification: true
  },
  {
    name: 'Omeprazole',
    quantity: 75,
    expiry_date: '2023-02-28',
    store: 'Hanley',
    requiresIdVerification: false
  },
  {
    name: 'Simvastatin',
    quantity: 40,
    expiry_date: '2024-01-31',
    store: 'Fenton',
    requiresIdVerification: false
  },
  {
    name: 'Ramipril',
    quantity: 20,
    expiry_date: '2022-09-30',
    store: 'Longton',
    requiresIdVerification: false
  }
];


const sales = [
  {
    customer: '6440fa300bb42a2814753ba9',
    medicine: '6440fb090f271581e834679e',
    quantity: 1,
    price: 4.99,
    date: '2023-03-11',
    processed: false,
  },
  {
    customer: '6440fa300bb42a2814753bac',
    medicine: '6440fb090f271581e834679e',
    quantity: 2,
    price: 9.99,
    date: '2023-02-20',
    processed: true,
  },
  {
    customer: '6440fa300bb42a2814753baf',
    medicine: '6440fb090f271581e834679f',
    quantity: 10,
    price: 4.99,
    date: '2023-04-09',
    processed: true,
  },
  {
    customer: '6440fa300bb42a2814753bb2',
    medicine: '6440fb090f271581e83467a0',
    quantity: 3,
    price: 6.99,
    date: '2023-04-13',
    processed: false,
  },
  {
    customer: '6440fa300bb42a2814753bb5',
    medicine: '6440fb090f271581e83467a1',
    quantity: 1,
    price: 2.99,
    date: '2023-04-17',
    processed: true,
  },
  {
    customer: '6440fa300bb42a2814753bb8',
    medicine: '6440fb090f271581e83467a4',
    quantity: 9,
    price: 18.99,
    date: '2023-04-01',
    processed: false,
  },
  {
    customer: '6440fa300bb42a2814753bba',
    medicine: '6440fb090f271581e83467a6',
    quantity: 5,
    price: 8.99,
    date: '2023-04-04',
    processed: true,
  },
];

const customers = [
  {
    name: 'Jane Smith',
    address: '456 Oak St, Fenton',
    age: 42,
    dob: '1979-02-20',
    medicationHistory: [
      {
        medicine: 'Ibuprofen',
        dosage: '200mg',
        start_date: '2022-03-01',
        endDate: null,
        notes: 'Prescribed for back pain',
      },
      {
        medicine: 'Lisinopril',
        dosage: '20mg',
        start_date: '2022-01-01',
        endDate: null,
        notes: 'Prescribed for high blood pressure',
      },
    ],
    allergies: ['None'],
    medicalConditions: ['High blood pressure'],
  },
  {
    name: 'John Doe',
    address: '123 Main St, Springfield',
    age: 35,
    dob: '1988-07-15',
    medicationHistory: [
      {
        medicine: 'Amoxicillin',
        dosage: '500mg',
        start_date: '2022-02-10',
        endDate: null,
        notes: 'Prescribed for sinus infection',
      },
      {
        medicine: 'Loratadine',
        dosage: '10mg',
        start_date: '2022-01-01',
        endDate: null,
        notes: 'Prescribed for allergies',
      },
    ],
    allergies: ['Peanuts'],
    medicalConditions: ['Asthma'],
  },
  {
    name: 'Alice Johnson',
    address: '789 Elm St, Anytown',
    age: 27,
    dob: '1996-10-30',
    medicationHistory: [
      {
        medicine: 'Prozac',
        dosage: '20mg',
        start_date: '2022-03-15',
        endDate: null,
        notes: 'Prescribed for depression',
      },
      {
        medicine: 'Adderall',
        dosage: '10mg',
        start_date: '2022-02-01',
        endDate: null,
        notes: 'Prescribed for ADHD',
      },
    ],
    allergies: ['None'],
    medicalConditions: ['Depression'],
  },
  {
    name: 'Bob Lee',
    address: '555 Pine St, Anytown',
    age: 55,
    dob: '1968-05-05',
    medicationHistory: [
      {
        medicine: 'Metformin',
        dosage: '1000mg',
        start_date: '2022-01-01',
        endDate: null,
        notes: 'Prescribed for type 2 diabetes',
      },
      {
        medicine: 'Lisinopril',
        dosage: '40mg',
        start_date: '2022-02-01',
        endDate: null,
        notes: 'Prescribed for high blood pressure',
      },
    ],
    allergies: ['None'],
    medicalConditions: ['Type 2 diabetes'],
  },
  {
    name: 'Sarah Davis',
    address: '444 Maple St, Anytown',
    age: 50,
    dob: '1973-09-05',
    medicationHistory: [
      {
        medicine: 'Lipitor',
        dosage: '40mg',
        start_date: '2022-01-01',
        endDate: null,
        notes: 'Prescribed for high cholesterol',
      },
      {
        medicine: 'Lisinopril',
        dosage: '40mg',
        start_date: '2022-02-01',
        endDate: null,
        notes: 'Prescribed for high blood pressure',
      },
    ],
    allergies: ['None'],
    medicalConditions: ['Type 2 diabetes'],
  },
  {
    name: 'Jessica Taylor',
    address: '987 Pine St, Raleigh',
    age: 36,
    dob: '1987-05-20',
    medicationHistory: [
      {
        medicine: 'Adderall',
        dosage: '20mg',
        start_date: '2022-01-01',
        endDate: null,
        notes: 'Prescribed for ADHD'
      }
    ],
    allergies: [
      'None'
    ],
    medicalConditions: [
      'ADHD',
      'Anxiety'
    ]
  },
  {
    name: 'David Lee',
    address: '555 Maple Ave, Greensboro',
    age: 50,
    dob: '1973-11-01',
    medicationHistory: [
      {
        medicine: 'Metformin',
        dosage: '500mg',
        start_date: '2021-09-01',
        endDate: null,
        notes: 'Prescribed for type 2 diabetes'
      },
      {
        medicine: 'Lisinopril',
        dosage: '10mg',
        start_date: '2022-02-01',
        endDate: null,
        notes: 'Prescribed for high blood pressure'
      }
    ],
    allergies: [
      'Shellfish'
    ],
    medicalConditions: [
      'Type 2 diabetes',
      'High blood pressure'
    ]
  },
  {
    name: 'Mary Johnson',
    address: '789 Elm St, Springfield',
    age: 28,
    dob: '1995-12-10',
    medicationHistory: [
      {
        medicine: 'Prozac',
        dosage: '20mg',
        start_date: '2022-02-01',
        endDate: null,
        notes: 'Prescribed for depression'
      }
    ],
    allergies: [
      'None'
    ],
    medicalConditions: [
      'Depression',
      'Anxiety'
    ]
  },
];

module.exports = { customers, medicines, sales };
