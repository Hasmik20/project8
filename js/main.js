//---------------------- header title
const text = document.querySelector('.headerName');
// to select content from text 
const textStr = text.textContent;

//to split the text
const splitText = textStr.split("");
//in order not to have 2 of same text add
text.textContent = '';

let char = 0;
let timer = setInterval(onTick, 50)

for (let i = 0; i < splitText.length; i++)
{
    let char = (splitText[i] === " ") ? "&nbsp;" : splitText[i];
    text.innerHTML += ` <span> ${char} </span>`
}

function onTick(){
    const span = text.querySelectorAll('span')[char]
    span.classList.add('fade')
    char++;
    if(char === splitText.length){
        
        complete();
        return;
    }
}

function complete(){
    clearInterval(timer);
    timer = null;
}
// ---------------------------global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const searchEmployee = document.querySelector('#employeeSearch');
let i;


// fetch data from API

fetch(urlAPI)
    .then(res => res.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

    //create employees data function
    function displayEmployees(employeeData){
        employees = employeeData;
    //store the employee HTML 
        let employeeHTML = '';
    //loop through each employee and create HTML markup
        employees.forEach((employee, index) => {
            let name = employee.name;
            let email = employee.email;
            let city = employee.location.city;
            let picture = employee.picture;
            
            employeeHTML += `
                <div class="card" data-index="${index}">
                    <img class="avatar" src="${picture.large}"/>
                    <div class="text-container">
                        <h2 class="name">${name.first} ${name.last}</h2>
                        <p class="email">${email}</p>
                        <p class="address">${city}</p>
                    </div>
                </div>
            `
        });
        gridContainer.innerHTML = employeeHTML
    }

    //display modal 

    function displayModal(index){
        //use object destructuring 
        let{name, dob, phone, email, location:{city, street, state, postcode}, picture} = employees[index];

        let date = new Date(dob.date);
        const modalHTML =`
            <img class="avatar" src="${picture.large}"/>
            <div class="text-container">
                  <h2 class="name">${name.first} ${name.last}</h2>
                 <p class="email">${email}</p>
                 <p class="address">${city}</p>
                 <hr/>
                 <p>${phone}</p>
                 <p class="address">${street.name}, ${street.number}, ${city}, ${state}, ${postcode}</p>
                 <p>Birthday:
                 ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
            `
            overlay.classList.remove('hidden');
            modalContainer.innerHTML = modalHTML;
    }

    

    //display card/modal
    gridContainer.addEventListener('click', e =>{
        if(e.target != gridContainer){

            //select the card element based on its proximity to actual element clicked
            const card = e.target.closest(".card");
            const index = card.getAttribute('data-index');
            i = index;
            displayModal(index)
        }
    });

    //modal close 
    modalClose.addEventListener('click',() =>{ 
        overlay.classList.add('hidden'); 
    });
    //change/slide cards

    let nextBtn = document.querySelector('#right');
    let prevBtn = document.querySelector('#left');
 
    nextBtn.addEventListener('click', ()=>{
        if(i < 11){
            i++;
            displayModal(i)  
    }else if(i === 11)
        i = 0;
        displayModal(i)
})
prevBtn.addEventListener('click', ()=>{
    if(i > 0){
        i--;
        displayModal(i)
    } else if(i===0){
        i = 11;
        displayModal(i)
    }
})

//--------serach employee
searchEmployee.addEventListener("keyup", () => {
    let searchValue = searchEmployee.value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    let name = document.querySelectorAll(".name");    
    for (let i = 0; i < cards.length; i++){
            if(name[i].innerHTML.toLowerCase().indexOf(searchValue) > -1){
            cards[i].style.cssText ="display:''; width: 270px"
            } else {
            cards[i].style.display = 'none';
            }
        }   
});
  
