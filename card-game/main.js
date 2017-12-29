var setting = {
        size: 4,
        arenaWidth: 800
    },
    cards = [],
    arena = document.getElementById('arena');

// 初始化卡盘 
function init () {
    arena.style.width = setting.arenaWidth + 'px';
    this.initCards();
    this.bindEvents();
}

function getCardPairs () {
    var cardPairs = [];
    for (var i = 0;i < Math.pow(setting.size, 2)/2;i ++) {
        cardPairs.push(i);
    }
    return cardPairs.concat(cardPairs);// if size = 2, will get [1, 2, 1, 2]
}

function initCards () {
    var cardPairs = this.getCardPairs(),
        cardsLength = Math.pow(setting.size, 2),
        cardValue,
        cardWidth = (setting.arenaWidth / setting.size - 20 + 'px');
    for (var i = 0;i < cardsLength;i++) {
        cardValue = cardPairs.splice(Math.floor(Math.random() * (cardsLength - i)), 1)[0];
        cards.push({
            isOpen: false,
            value: cardValue
        })
        var div = document.createElement('div');
        div.innerHTML = cardValue;
        div.classList += 'card';
        div.style.height = cardWidth;
        div.style.width = cardWidth;
        div.dataset.index = i;
        arena.append(div);
    }
}

function bindEvents () {
    var cardsDOM = document.getElementsByClassName('card');
    for (var i = 0;i < cardsDOM.length; i++) {
        cardsDOM[i].addEventListener('click', function () {
            console.log(this.dataset.index);
        });
    }
}

init.getCardPairs = getCardPairs;
init.initCards = initCards;
init.bindEvents = bindEvents;

function renderArena () {
    
}

init ();