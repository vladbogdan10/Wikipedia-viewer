var userInput;
var wikiLink = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts|info&exintro&exsentences=1&exlimit=max&formatversion=2&inprop=url&callback=jsonData&gsrsearch=';

function getJSONP() {
    //Create a SCRIPT element.
    var script = document.createElement('script');

    //Set the Type.
    script.type = 'text/javascript';

    //Set the source to the URL the JSON Service.
    script.src = wikiLink + userInput;

    //Append the script element to the HEAD section.
    document.getElementsByTagName('head')[0].appendChild(script);
};

function inputFromUser() {
    
    userInput = document.querySelector('.search').value;

    userInput !== ''? getJSONP() : null;
    
};


function setupEventListeners() {
    document.querySelector('.submit').addEventListener('click', function () {

        inputFromUser();
    });

    document.addEventListener('keypress', function (event) {
        
        if (event.keyCode === 13 || event.which === 13) {
            
            inputFromUser();
        }
    });
}


// Callback function to manipulate data recived from API call
function jsonData(data) {
    console.log(data)

    data.query.pages.forEach(function (el) {
        
        var card = '<div class="input-container" id="card-' + el + '"><h4>' + el.title + '</h4>' + el.extract + '..' + '</div>';

        console.log(card);

        document.querySelector('#search-results').innerHTML += card;

    });
};


function init() {
    console.log('Application has started');
    setupEventListeners();
}

init();


//   'https://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&exintro&exlimit=max&inprop=url&generator=search&gsroffset=&format=json&formatversion=2&callback=jsonData&gsrsearch=' + userInput + '&continue=';
