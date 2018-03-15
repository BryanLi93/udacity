var setting = {
        size: 4,
        arenaWidth: 800
    },
    $arena = document.getElementById('arena'),
    $timer = document.getElementById('timer'),
    $star = document.getElementById('star'),
    $moves = document.getElementById('moves'),
    cards,
    cardsNode,
    previousIndex,
    canClick,
    openCount,
    timer,
    timerInterval,
    star,
    moves;

// 初始化卡盘 
function init() {
    cards = [];
    cardsNode = null;
    previousIndex = null;
    canClick = true;
    openCount = 0;
    timer = 0;
    star = 3;
    moves = 0;

    $timer.innerText = timer;
    $star.innerText = star;
    $moves.innerText = moves;

    clearInterval(timerInterval);

    $arena.style.width = setting.arenaWidth + 'px';
    while ($arena.firstChild) {
        $arena.removeChild($arena.firstChild)
    }
    this.initCards();
    this.bindEvents();
    this.initTimer();
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

            $moves.innerText = ++moves;

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
                        var txt = '共用时' + timer + '秒，';
                        if (timer < 21) {
                            txt = '获得了三星，非常棒！';
                        } else if (timer < 41) {
                            txt = '获得了两星，超越全国50%的玩家！';
                        } else {
                            txt = '获得了一星，还需努力！';
                        }
                        clearInterval(timerInterval);
                        alert(txt);
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

function initTimer () {
    timerInterval = setInterval(function () {
        timer += 1;
        $timer.innerText = timer;
        if (timer > 20 && timer < 41) {
            star = 2;
        } else if (timer >= 41) {
            star = 1;
        }
        $star.innerText = star;
    }, 1000);
}

init.getCardPairs = getCardPairs;
init.initCards = initCards;
init.bindEvents = bindEvents;

init();