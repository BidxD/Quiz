const DisplayQuestion = document.getElementById("question")
const API = "https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple"
const BAPI = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=base64"
let BackedUpQuestions = []
const Points = document.getElementById("Points")
const Options =[
    document.getElementById("1"),
    document.getElementById("2"),
    document.getElementById("3"),
    document.getElementById("4"),
]
let CorrectAnswer = []
let ReservedButtons = []

//Initializing the first questions!
Init();



function GetRandNum(num){
    return Math.floor(Math.random() * num)
}



async function GetQuizQuestion(){
    try {
        const response = await fetch(BAPI);
        if (!response.ok){
            throw "Failed to fetch data from api"
        }else{
            const data = await response.json()
            return data.results 
        }
        

       


    } catch (error) {
        console.log(`Failed ${error}`)
    }
}

Validate = (data) =>{
    
}

StartCooking = (data) =>{
    console.log(data.length)
    if (data.length > 0 ){

        DisplayQuestion.value = atob(data[data.length -1].question)



        let TempInstanceOfOptions = Options.slice();

        let indexed;
        data[data.length-1]["incorrect_answers"].forEach((answer,index) =>{
            console.log(TempInstanceOfOptions)
           indexed = GetRandNum(TempInstanceOfOptions.length);
           TempInstanceOfOptions[indexed].innerText = atob(answer); 
           TempInstanceOfOptions.splice(indexed,1)
        })

        TempInstanceOfOptions[0].innerText = atob(data[data.length-1].correct_answer)
        CorrectAnswer[atob(data[data.length -1].question)] = atob(data[data.length-1].correct_answer)

        TempInstanceOfOptions.splice(0,TempInstanceOfOptions.length)
        console.log(TempInstanceOfOptions)

        console.log(CorrectAnswer)
        


        data.pop()
        
    }else{
       Init();
    }
}

function Init(){
GetQuizQuestion().then(f = (data)=>{
    if(data){
        BackedUpQuestions = data;
        console.log(BackedUpQuestions)
        StartCooking(BackedUpQuestions)
    }
})
}



Options.forEach(element => {
    element.onclick = function(){
        console.log(CorrectAnswer[DisplayQuestion.value])
        if (CorrectAnswer[DisplayQuestion.value] == element.innerText){
            alert("Correct answer!")

            Points.innerHTML = Number(Points.innerHTML) + 1
            StartCooking(BackedUpQuestions)
        }else{
            alert("wrong answer!")
        }
    }
});















