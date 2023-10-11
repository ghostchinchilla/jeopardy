makeBoard();
categoryRow();

document.querySelector('button').addEventListener('click', getCategories);

function categoryRow() {
    let categories=document.getElementById("category-row");

    for(let i=0; i<6; i++){
        let box= document.createElement('div');
        box.className= "clue-box category-box";
        categories.appendChild(box);
    } 
}

function makeBoard() {
    let board=document.getElementById("clues");

// 5 ROWS WITH 6 BOXES EACH

    for(let i = 0; i < 5; i++) {
        let row= document.createElement('div');
        row.className= "clue-row";

        for(let j = 0; j < 6; j++) {
           let box = document.createElement('div');
            box.className= "clue-box";
            box.textContent= ("?");
            box.addEventListener('click', getClue, false)
            row.appendChild(box);
        }

        board.appendChild(row);
    }
     };


     let catArray=[];
     

      getCategories();

      async function getCategories(catId) { 
        
        const res = await axios.get(`https://jservice.io/api/categories?count=100`);
        
        const randNum= (res.data[Math.floor(Math.random() * res.data.length)]); 
       
        const shuffled = res.data.sort(() => 0.5 - Math.random());

        let selected = shuffled.slice(0, 6);

console.log(selected);

        for(let i=0; i<selected.length; i++) {
            let category=selected[i];
            const res = await axios.get(`https://jservice.io/api/clues?category=${category.id}`);
console.log(res); 
        }
    setCategories(selected);
};

    
    function setCategories(catArray) {
        let element = document.getElementById('category-row')
        let children = element.children;
        for(let i=0; i<children.length; i++) {
            children[i].innerHTML = catArray[i].title;

        } 
    };
    

let cluesArray=[];


 async function getClue(e) {
    let child = e.currentTarget;
    child.classList.add('clicked-box');
    }

     
     
     
     function showQuestion(clue, target) {
        
     }



async function fillTable() {
 
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

