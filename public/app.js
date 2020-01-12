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
//   // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();


var db = firebase.database();


var user = "vallari";
var currentWeek = 0;


var nextWeek = document.getElementById('next');
var previousWeek = document.getElementById('previous');

function previousWeekClick(){
    if(currentWeek == 0) return;
    currentWeek --;
    mark();
}
function nextWeekClick(){
    if(currentWeek == 51) return;
    currentWeek ++;
    mark();
}
    // nextWeek.addEventListener('click', () => {
    //     currentWeek ++;
    // });

    // previousWeek.addEventListener('click', () => {
    //     currentWeek --;
    // });


//print timetable

var days = ['monday','tuesday','wednesday','thurday', 'friday'];


for(var i=0; i<5; i++){
    
    var j=0;

    db.ref(user + '/tt/' + days[i]).on('value', (snapshot) => { 
            
        var tt = document.getElementById('tt');
        var classes = snapshot.val();
        
        var newNode = document.createElement('ul');
        newNode.className = 'day';
        newNode.innerHTML = days[j].toUpperCase(); j++;
        console.log(newNode);
        newNode.append(classes.forEach(element => {
            
            newNode.innerHTML += `<li class = "classes">  ${element}   </li>`;
            
        }));   
      
        tt.appendChild(newNode);
        newNode.removeChild( newNode.lastChild );
        
        
});
}




//To mark Present (true), Absent(false) and No-class(null)

function mark(){
    document.getElementById('weekNum').innerHTML=`Week:  ${currentWeek + 1}`;
    var weeks = db.ref(user + '/weeks/' + currentWeek );
    weeks.on('value', (snapshot) => {
        var weekObj = snapshot.val();
        
        a(weekObj);
    });
}
mark();


function a(weekObj){   
    

    var tt = document.querySelectorAll('.day');



    for(var i=0; i<5; i++){
      
        var day = tt[i].firstChild.nodeValue.toLowerCase();
        var binary = weekObj[day];
        var dayElement = tt[i];
        var j = 0;
        
        while(binary[j]!=null){
            var classElement = dayElement.childNodes[j+1];
            if(binary[j] === 0){
                classElement.style.color = "grey";
            }
            if(binary[j] === 1){
                
                classElement.style.color = "green";
                
            }
            if(binary[j] === 2){
                
                classElement.style.color = "red";
                
            }
            j++;
        }    
        
    }

}


    var tt = document.getElementById('tt')
    tt.addEventListener('click', (e) =>{
        var classClick = e.target.innerText, attended = 0, total = 0, stat;
        
        var dayClicked, i= 0, newValue = 0, binary ; 
        if(e.target.style.color == "grey"){
            //make it green
            e.target.style.color = "green";
            newValue = 1;
            dayClicked = e.target.parentElement.firstChild.nodeValue.toLowerCase();
            
            var child = e.target;
            while( (child = child.previousSibling) != null )   i++;
            i--;
            attended++; total++;
        }
        else if(e.target.style.color == "green"){
            //make it red
            
            
            e.target.style.color = "red";
            newValue = 2;
            dayClicked = e.target.parentElement.firstChild.nodeValue.toLowerCase();
            
            var child = e.target;
            while( (child = child.previousSibling) != null )   i++;
            i--;
            total++;

        }
        else if(e.target.style.color == "red"){
            //make it grey
            e.target.style.color = "grey";
            newValue = 0;
            dayClicked = e.target.parentElement.firstChild.nodeValue.toLowerCase();
            
            var child = e.target;
            while( (child = child.previousSibling) != null )   i++;
            i--;
            total --;

        }
        db.ref(user + '/weeks/' + currentWeek ).on('value', (snapshot) => {
            var weekObj = snapshot.val();
            binary = weekObj[dayClicked];
            binary[i] = newValue;
        });
        
        db.ref(user + '/weeks/' + currentWeek + '/' + dayClicked ).set(binary);
        db.ref(user + '/subjects/' + classClick ).on('value', (snapshot) => {
            stat = snapshot.val();
            // console.log(stat);
            stat[0] += attended;
            stat[1] += total;
            stat[2] = (stat[0]/stat[1])*100;
            console.log(stat);
        });
        db.ref(user + '/subjects/' + classClick).set(stat);
        
    });    

// display subject stats

db.ref(user + '/subjects' ).on('value', (snapshot) => {
    var subStat = snapshot.val();
    console.log(subStat);
    var displayArea = document.getElementById('stats');
    console.log(displayArea);
    for(var i=1; i<13; i+2){
        console.log(displayArea.childNodes[i]);
    }
});

