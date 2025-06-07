const firebaseConfig = {
  apiKey: "AIzaSyByPZsU3nwaqSuo3DGLX1WdirH8QoB8ih4",
  authDomain: "pululu9999.firebaseapp.com",
  databaseURL: "https://pululu9999.firebaseio.com",
  projectId: "pululu9999",
  storageBucket: "pululu9999.appspot.com",
  messagingSenderId: "702490612360",
  appId: "1:702490612360:web:0975d252c4822e4118053d"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();