let cats = [{
  name: '小冬瓜',
  avatar: './images/cat1.jpg',
  clickTimes: 0
}, {
  name: '小西瓜',
  avatar: './images/cat2.jpg',
  clickTimes: 0
}, {
  name: '小南瓜',
  avatar: './images/cat3.jpg',
  clickTimes: 0
}, {
  name: '小黄瓜',
  avatar: './images/cat4.jpg',
  clickTimes: 0
}, {
  name: '小笨瓜',
  avatar: './images/cat5.jpg',
  clickTimes: 0
}];

for (cat of cats) {
  $('#ShangHai').append(`
    <div class="cat-control">
      ${cat.name}被点击了
      <span class="click-times">${cat.clickTimes}</span>
      次
    </div>
    <div class="cat-house">
      ${cat.name}:
      <img class="cat" src="${cat.avatar}" alt="${cat.name}">
    </div>
  `);
}

$('.cat').click(function () {
  let herClickTimes = $(this).parent().prev().find('.click-times');
  herClickTimes.text(herClickTimes.text() * 1 + 1);
});