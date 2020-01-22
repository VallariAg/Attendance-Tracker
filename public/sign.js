// export function takeUser(){return userId};
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyDV0ZW5jXipi2VVX_7IxEzcsYTymAJ1PrQ",
    authDomain: "attendence-tracker-74c86.firebaseapp.com",
    databaseURL: "https://attendence-tracker-74c86.firebaseio.com",
    projectId: "attendence-tracker-74c86",
    storageBucket: "attendence-tracker-74c86.appspot.com",
    messagingSenderId: "598477898243",
    appId: "1:598477898243:web:2d7a610b4404a299b78436",
    measurementId: "G-P9WEQNL3YK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.database(); 


function signin(){

var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithRedirect(provider);

}
// var signinButton = document.getElementById('signin');
// signinButton.addEventListener('click',signin());


var userId,userImg,userName;

firebase.auth().onAuthStateChanged(function(user) {
    var log = document.getElementById('tt');

    if (user) {
      // User is signed in.
      var a = document.getElementById('userName');
      a.innerHTML = `user ${user.displayName} here`;
      console.log("logged in");
      log.innerHTML += `<h2> Hello, ${user.displayName} !`;
      userId = user.uid;
      userImg = user.photoURL;
      userName = user.displayName;
      console.log(userId); 
      
      db.ref().on('value', (snapshot) => {
          var userList = snapshot.val();
          var userList = (Object.keys(userList));
          var exist = 0;
          userList.forEach((user) => {
              if(userId == user){
                  //sign them in
      
                  exist = 1;
                  
                  document.cookie = `user=${userId};path=/;`;
                  document.cookie = `userName=${encodeURIComponent(userName)}`;
                  document.cookie = `userImg=${encodeURIComponent(userImg)}`;
                  window.location.href = "home.html";

              }
          });
          if(exist == 0){
              // no such user data 
              // create account
              console.log('v')
              log.innerHTML += `<hr> <h4> Seems like you don't have an account! </h4>
                                <button>Create an account!</button>`;

          }

      
  }) ; 




    } else {
      // No user is signed in.
      tt.innerHTML = "Join us, NOW!";
      var a = document.getElementById('userName');
      a.innerHTML = "no user here";
      var now = new Date();
        now.setMonth( now.getMonth() - 1 );
        document.cookie = "expires=" + now.toUTCString() + ";";
    }
  });


function signout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful. 
        console.log("logged out");
        // var now = new Date();
        // now.setMonth( now.getMonth() - 1 );
        // document.cookie = "expires=" + now.toUTCString() + ";";

      }).catch(function(error) {
        // An error happened.
        console.log("cant log out")

      });
      
}
