let myDB=window.localStorage;

let ticketsContainer = document.querySelector(".ticktes-container");

let allFilterClasses =["red","blue","green","yellow","black"];


function loadTickets(){

let allTickets =myDB.getItem("allTickets");
if(allTickets){
    allTickets =JSON.parse(allTickets);
    
    for(let i=0; i<allTickets.length;i++){
        let ticketInfoObject =allTickets[i];
        apppendTicket(ticketInfoObject);
    }
}
}
loadTickets();



function loadSelectedTickets(filter){

    let allTickets =myDB.getItem("allTickets");
    if(allTickets){
        allTickets =JSON.parse(allTickets);
        for(let i=0; i<allTickets.length;i++){
            let ticketInfoObject =allTickets[i];
            if(ticketInfoObject.ticketFilters==filter){
                apppendTicket(ticketInfoObject);
            }
           
        }
    }
}

function saveTicketToDB(ticketInfoObject){

    let allTickets =myDB.getItem("allTickets");
    if(allTickets){
        //alreday all tickets are present 
        allTickets= JSON.parse(allTickets);
        allTickets.push(ticketInfoObject);
        myDB.setItem("allTickets",JSON.stringify(allTickets));

    }
    else{
     //no all tickets key found 
     let allTickets =[ticketInfoObject];
     myDB.setItem("allTickets",JSON.stringify(allTickets));
    }

    }


    function apppendTicket(ticketInfoObject){
        let {ticketFilters,ticketValue,ticketId} =ticketInfoObject;
        
        let ticketDiv =document.createElement("div");
        ticketDiv.classList.add("ticket");
    
        ticketDiv.innerHTML=`<div class="ticket-header ${ticketFilters} "></div>
        
        <div class="ticket-content">
            <div class="ticket-info">
                <div class="ticket-id"> #${ticketId}</div>
                <div class="ticket-delete fas fa-trash"></div>
            </div>
            <div class="ticket-value"> ${ticketValue} </div>
        </div> `;


       let ticketHeader =ticketDiv.querySelector(".ticket-header");
       ticketHeader.addEventListener("click",function(e){
           //logic which switch ticket color/filter

           let currentFilter=e.target.classList[1];
           let indexOfcurrFilter =allFilterClasses.indexOf(currentFilter);

           let newIndex = (indexOfcurrFilter+1)%allFilterClasses.length;
           let newFilter =allFilterClasses[newIndex];

           ticketHeader.classList.remove(currentFilter);
           ticketHeader.classList.add(newFilter);


           let allTickets =JSON.parse(myDB.getItem("allTickets"));
           for(let i=0; i<allTickets.length;i++){
               if(allTickets[i].ticketId==ticketId){
                allTickets[i].ticketFilters =newFilter;
               }
           }
           myDB.setItem("allTickets",JSON.stringify(allTickets));
       })





        let deleteTicketBtn =ticketDiv.querySelector(".ticket-delete");

        deleteTicketBtn.addEventListener("click",function(){
            ticketDiv.remove(); // it will remove from th ui

            deleteTicketFromDb(ticketId);
        })




    
        ticketsContainer.append(ticketDiv);
    }
    

    function deleteTicketFromDb(ticketId){

        let allTickets =JSON.parse(myDB.getItem("allTickets"));

        //[{},{},{},{},{},{},{}]

        let updatedTickets = allTickets.filter( function(ticketObject){

            if(ticketObject.ticketId==ticketId){
                return false;
            }
            
            return true;
        });

        myDB.setItem("allTickets",JSON.stringify(updatedTickets));
    

    }

    