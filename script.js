let X = 0
let Y = 0
let xOffset = 0
let yOffset = 0
let selectedCard
let zindex = 0
let cardDict = 
{
    "A":1,
    "J":11,
    "Q":12,
    "K":13
}
//let wholeSuite = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"] flash back to the time this pointed to a memory address :)))
//to do: 
//querySelector() and element to see if it has children and if so troll this user (finish game intialization) qjery selecot working?
//make revearl code
//king ssyttem (win and droppin into slot class)
//remove card from pool and probably remove the while lop
//double click
//ba ba ba be be beo bd bea
let cardPool = ["dA","d2","d3","d4","d5","d6","d7","d8","d9","d10","dJ","dQ","dK","cA","c2","c3","c4","c5","c6","c7","c8","c9","c10","cJ","cQ","cK","hA","h2","h3","h4","h5","h6","h7","h8","h9","h10","hJ","hQ","hK","sA","s2","s3","s4","s5","s6","s7","s8","s9","s10","sJ","sQ","sK"]


let currentDraw = -1;
//DIAMOND,CLUBS,HEARTS,SPADES

//console.log(cardPool)
let board = document.getElementById("placeable_area")
let drawPile = document.getElementById("drawPile")
let drawCardDiv = document.getElementById("drawCard")
document.addEventListener("mousemove",function(e)
{
X = e.clientX
Y = e.clientY
if(selectedCard)
{
    selectedCard.style.left = (X-xOffset).toString() + "px"
    selectedCard.style.top = (Y-yOffset).toString() + "px"
}
})

function startDragging(card)
{
   selectedCard = card
   xOffset = X-selectedCard.offsetLeft
   yOffset = Y-selectedCard.offsetTop
   //alert(card.dataset.suite)
}



function stopDragging()
{
    selectedCard = null
}
function createCard(cardData,slot,revealed)
{
    let card = document.createElement("div")
    card.classList.add("cardDimension")
    card.classList.add("card")
    let tLN = document.createElement("div") //top left number
    tLN.classList.add("topLNumber")
    let bRN = document.createElement("div") //bottom right number
    bRN.classList.add("bottomRNumber")
    let chosenSuite = "report this bug please"
    //♠♦♣♥
    switch(cardData.charAt(0))
    {
        case "d":
            card.style.color = "red"
            chosenSuite = "♦"
            card.dataset.suite = "red"
        break;
        case "c":
            card.style.color = "black"
            chosenSuite = "♣"
            card.dataset.suite = "black"
        break;
        case "h":
            card.style.color = "red"
            chosenSuite = "♥"
            card.dataset.suite = "red"
        break;
        case "s":
            card.style.color = "black"
            chosenSuite = "♠"
            card.dataset.suite = "black"
        break;
    }
    card.id = cardData
    cardData = cardData.slice(1,cardData.length)
    let trueValue = cardData
    if(cardDict[cardData])
    {
        trueValue = cardDict[cardData]
    }
    
    card.dataset.trueValue = trueValue
    bRN.innerText = cardData + "\n" + chosenSuite
    tLN.innerText = cardData + "\n" + chosenSuite
    slot.appendChild(card)
    let suiteDiv = document.createElement("div")
    suiteDiv.classList.add("suite")
    suiteDiv.innerText = chosenSuite
    if(!revealed)
    {
        card.style.backgroundImage = 'url("back.jpg")'
        card.dataset.unrevealed="active"
        card.draggable = false
        return card
    }
    card.appendChild(suiteDiv)
    card.appendChild(tLN)
    card.appendChild(bRN)
    card.draggable = false
    return card
}
function cardChooser()
{
    let chosenCard = 0
    let cardChoice = 0
    cardChoice = Math.floor(Math.random() * cardPool.length)
    chosenCard = cardPool[cardChoice];
    //cardPool[suiteChoice][cardChoice] = 0
    cardPool.splice(cardChoice,1)
    //console.log(cardPool[suiteChoice][cardChoice])
   // cardPool[suiteChoice].splice(cardChoice,1);
    return chosenCard
}

function generateGame() 
{ 
   
    for(let i=0;i<7;i++) //slot iteration
    {
        let card = document.createElement("div")
        card.classList.add("cardDimension")
        card.classList.add("card")
        let slot = document.getElementById("slot"+i.toString())
        let element = slot
        for(let y=0;y<i;y++) //card iteration
        {
            element = createCard(cardChooser(),element,false) 
        }
        createCard(cardChooser(),element,true)
       
    }
   
cardPool.sort(() => Math.random() - 0.5); 
console.log(cardPool)
}
generateGame()

function drawCard()
{
    currentDraw++
   
    
    if(currentDraw == cardPool.length-1)
    {
        drawCardDiv.style.backgroundImage = "none";
        createCard(cardPool[currentDraw],drawPile,true)
        return
    }
    if(currentDraw >= cardPool.length)
    {
        drawCardDiv.style.backgroundImage = 'url("back.jpg")';
        // createCard(cardPool[currentDraw],drawPile)
         currentDraw = -1
         while(drawPile.childElementCount > 0)
         {
             drawPile.removeChild(drawPile.lastElementChild)
         }
        return;
    }
    
    createCard(cardPool[currentDraw],drawPile,true)
   
}

/*
let cbox = document.querySelectorAll(".card");
cbox.forEach(box => {
  box.addEventListener('mousedown', () => alert(box));
  box.addEventListener('mouseup', () => stopDragging(box))
});
*/

document.addEventListener("mousedown",function(e)
{
    if(e.target.dataset.trueValue == "1" && e.target.parentElement.dataset.suite == "A" || e.target.dataset.unrevealed)
    {
        
        return;
    }

    if(e.target.classList.contains("card"))
    {
        startDragging(e.target)
        zindex++
        e.target.style.zIndex = zindex
        e.target.style.pointerEvents = "none"
    }
})

function oppStack(target,cardRef)
{
    cardRef.style.pointerEvents = "auto"
    let unrevealedParent = cardRef.parentElement
    let UPSave = unrevealedParent.parentElement
    
    if(target.dataset.trueValue && parseInt(target.dataset.trueValue) != parseInt(cardRef.dataset.trueValue)+1 || target.parentElement.dataset.suite == "A" || target.parentElement.id == "drawPile" || target.dataset.unrevealed)
    {
        //cardRef.style.pointerEvents = "auto"
        returnCard(cardRef)
        return
    }
    
     let savedCardData = cardRef.cloneNode(true)
     cardRef.remove()
     cardRef = savedCardData
    cardRef.style.top = "30%"
    cardRef.style.left = null
    target.appendChild(cardRef)
    zindex++
    unrevealedParent.style.zIndex = zindex

    if(unrevealedParent.dataset.unrevealed)
    {
        let savedCardData = unrevealedParent.id
        unrevealedParent.remove()
        unrevealedParent = createCard(savedCardData,UPSave,true)
        UPSave.appendChild(unrevealedParent)
                zindex++
                unrevealedParent.style.zIndex = zindex
    }
    if(unrevealedParent.id == "drawPile")
    {
        cardPool.splice(currentDraw,1)
        currentDraw--
        console.log(cardPool)
    }
    
}

function returnCard(cardRef)
{
    if(cardRef.parentElement.id == "drawPile" || cardRef.parentElement.dataset.suite == "slot")
    {
        cardRef.style.left = null
        cardRef.style.top = null
    }
    else
    {
        cardRef.style.left = null
        cardRef.style.top = "30%"
    }
}

function sameStack(target,cardRef)
{
    cardRef.style.pointerEvents = "auto"
    let unrevealedParent = cardRef.parentElement
    let UPSave = unrevealedParent.parentElement

    if(target.parentElement.id == "drawPile" || target.dataset.unrevealed || parseInt(target.dataset.trueValue) != parseInt(cardRef.dataset.trueValue)-1)
    {
        //cardRef.style.pointerEvents = "auto"
        returnCard(cardRef)
        return
    }
    
    if(target.parentElement.dataset.suite=="A" && target.id.charAt(0) == cardRef.id.charAt(0) && parseInt(target.dataset.trueValue) == parseInt(cardRef.dataset.trueValue)-1 && cardRef.querySelector(".card") == null)
    {
        
        let savedCardData = cardRef.id
        cardRef.remove()
        cardRef = createCard(savedCardData,target,true)
        target.parentElement.appendChild(cardRef)
                zindex++
                cardRef.style.zIndex = zindex
    }
    if(unrevealedParent.id == "drawPile")
    {
        cardPool.splice(currentDraw,1)
        console.log(cardPool)
        currentDraw--
    }
    if(unrevealedParent.dataset.unrevealed)
    {
        let savedCardData = unrevealedParent.id
        unrevealedParent.remove()
        unrevealedParent = createCard(savedCardData,UPSave,true)
        UPSave.appendChild(unrevealedParent)
                zindex++
                unrevealedParent.style.zIndex = zindex
    }
    
}
document.addEventListener("mouseup",function(e)
{
    let cardRef = selectedCard
   // let ogzindex = cardRef.style.zindex
   // let ogPosition = [cardRef.style.left,cardRef.style.top]

    stopDragging()
    //console.log(selectedCard)
    if(cardRef == null)
    {
        return
    }
   
    let target = e.target

    
    switch(target.dataset.suite)
    {
        case "black":
            switch(cardRef.dataset.suite)
            {
                case "red":
                   oppStack(target,cardRef)

                break;
                case "black":
                    sameStack(target,cardRef)//replace with a "callback" that sends the card back to it's og slot (and do the dataset check)
                break;
            }
        break;
        case "red":
            switch(cardRef.dataset.suite)
            {
                case "black":
                   oppStack(target,cardRef)
                break;
                case "red":
                   sameStack(target,cardRef)
                break;
            }
        break;
        case "A":
            let unrevealedParent = cardRef.parentElement
            if(cardRef.dataset.trueValue == "1")
            {
                let UPSave = unrevealedParent.parentElement

                target.classList.remove("A")
                target.innerText = null
                let savedCardData = cardRef.id
                cardRef.remove()
                cardRef = createCard(savedCardData,target,true)
                target.appendChild(cardRef)


                if(unrevealedParent.dataset.unrevealed)
                {
                    let savedCardData = unrevealedParent.id
                    unrevealedParent.remove()
                    unrevealedParent = createCard(savedCardData,UPSave,true)
                    UPSave.appendChild(unrevealedParent)
                          //  zindex++
                            //unrevealedParent.style.zIndex = zindex
                }
                if(unrevealedParent.id == "drawPile")
    {
        
        cardPool.splice(currentDraw,1)
        currentDraw--
        console.log(cardPool)
    }
              //  cardRef.classList.remove("card")
               // cardRef.stye.left = e.target.style.left
               // cardRef.style.top = e.target.style.top
               // cardRef.style.left = (e.target.offsetLeft - cardRef.offsetLeft) + 'px';
                
                
               zindex++
               unrevealedParent.style.zIndex = zindex
            }
            else
            {
                returnCard(cardRef)
            }
            
        break;
        case "slot":
        {
            cardRef.style.pointerEvents = "auto"
            let unrevealedParent = cardRef.parentElement
            let UPSave = unrevealedParent.parentElement
            if(cardRef.dataset.trueValue != "13")
            {
                returnCard(cardRef)
                break;
            }
            let savedCardData = cardRef.cloneNode(true)
            cardRef.remove()
            cardRef = savedCardData
            cardRef.style.top = null
            cardRef.style.left = null
            target.appendChild(cardRef)
            zindex++
            unrevealedParent.style.zIndex = zindex
            if(unrevealedParent.id == "drawPile")
            {
                cardPool.splice(currentDraw,1)
                console.log(cardPool)
                currentDraw--
            }
            if(unrevealedParent.dataset.unrevealed)
            {
                let savedCardData = unrevealedParent.id
                unrevealedParent.remove()
                unrevealedParent = createCard(savedCardData,UPSave,true)
                UPSave.appendChild(unrevealedParent)
                        zindex++
                        unrevealedParent.style.zIndex = zindex
            }
        }        
        break;
        default:
           returnCard(cardRef)
            
        break;

    }
    cardRef.style.pointerEvents = "auto"
    //run this last
   // alert(e.target.innerText)
})




//console.log(cardPool)
/*
function cardSlots()
{
    let blanks = ["drawPile","blank"]
    let slot = document.createElement("div")
        slot.classList.add("drawCard")
        slot.classList.add("cardDimension")
        board.appendChild(slot)
        for(let i=0;i<2;i++)
        {
            slot = document.createElement("div")
            slot.id = blanks[i]
            slot.classList.add("cardDimension")
            board.appendChild(slot)
        }
    for(let i=0;i<4;i++)
    {
        let slot = document.createElement("div")
        slot.classList.add("A")
        slot.classList.add("cardDimension")
        slot.innerText = 'A'
        board.appendChild(slot)
    }
    for(let i=0;i<7;i++)
    {
        slot = document.createElement("div")
        slot.classList.add("cardDimension")
        board.appendChild(slot)
    }
}

cardSlots()
*/