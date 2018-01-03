var setting = {
        size: 4,
        arenaWidth: 800
    },
    $arena = document.getElementById('arena'),
    cards,
    cardsNode,
    previousIndex,
    canClick,
    openCount;

// 初始化卡盘 
function init() {
    cards = [];
    cardsNode = null;
    previousIndex = null;
    canClick = true;
    openCount = 0;

    $arena.style.width = setting.arenaWidth + 'px';
    while ($arena.firstChild) {
        $arena.removeChild($arena.firstChild)
    }
    this.initCards();
    this.bindEvents();
}

function getCardPairs() {
    var cardPairs = [];
    for (var i = 0; i < Math.pow(setting.size, 2) / 2; i++) {
        cardPairs.push(i);
    }
    return cardPairs.concat(cardPairs); // if size = 2, will get [1, 2, 1, 2]
}

function initCards() {
    var cardPairs = this.getCardPairs(),
        cardsLength = Math.pow(setting.size, 2),
        cardValue,
        cardWidth = (setting.arenaWidth / setting.size - 20 + 'px');
    for (var i = 0; i < cardsLength; i++) {
        cardValue = cardPairs.splice(Math.floor(Math.random() * (cardsLength - i)), 1)[0];
        cards.push({
            isOpen: false,
            value: cardValue
        })
        var $div = document.createElement('div');
        // $div.innerHTML = cardValue;
        $div.classList += 'card';
        $div.style.height = cardWidth;
        $div.style.width = cardWidth;
        $div.style.lineHeight = cardWidth;
        $div.dataset.index = i;
        $arena.append($div);
    }
    cardsNode = $arena.children;
}

function chooseCard(index) {
    if (cards[index].isOpen === false) { //只能选择没有翻面的卡牌
        if (previousIndex) { //选择卡牌和前一张比较
            cardsNode[index].innerHTML = cards[index].value;
            cards[index].isOpen = true;

            if (cards[index].value !== cards[previousIndex].value) {
                var toClearIndex = previousIndex;
                setTimeout(function () {
                    cardsNode[index].innerHTML = cardsNode[toClearIndex].innerHTML = '';
                    cards[index].isOpen = cards[toClearIndex].isOpen = false;
                }, 300);
            } else {
                openCount += 2;
                if (openCount === Math.pow(setting.size, 2)) {
                    setTimeout( function () {
                        if (confirm('Congratulations! Again?')) {
                            init();
                        }
                    }, 100);
                }
            }
            previousIndex = null;
        } else { //选择待比较的卡牌
            cardsNode[index].innerHTML = cards[index].value;
            cards[index].isOpen = true;
            previousIndex = index;
        }
    }
}

function bindEvents() {
    for (var i = 0; i < cardsNode.length; i++) {
        cardsNode[i].addEventListener('click', function () {
            if (canClick) {
                chooseCard(this.dataset.index)
            }
        });
    }
}

init.getCardPairs = getCardPairs;
init.initCards = initCards;
init.bindEvents = bindEvents;

init();