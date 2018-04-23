let model = {
  currentCat: {},
  cats: [{
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
  }]
};

const catListView = {
  init () {
    this.catList = $('#catList');
    this.render();
  },
  render () {
    this.catList.empty();
    const cats = octopus.getCats();
    for (let index = 0; index < cats.length; index++) {
      const cat = cats[index];
      this.catList.append(`
        <li>
          <span class="cats" data-index="${index}">
            ${cat.name}
          </span>
        </li>
      `);
    }

    $('.cats').unbind('click').click(function () {
      const catIndex = ($(this).data('index'));
      octopus.setCurrentCat(cats[catIndex]);
    });
  }
};

const catDetailView = {
  init () {
    this.catDetail = $('#catDetail');
    this.currentCatName = $('.cat-name');
    this.clickTimes = $('.click-times');
    this.catAvatar = $('.cat-avatar');

    this.catAvatar.unbind('click').click(() => {
      let currentCat = octopus.getCurrentCat();
      currentCat.clickTimes++;
      octopus.setCurrentCat(currentCat);
      this.render();
    });
  },
  render () {
    const currentCat = octopus.getCurrentCat();
    this.currentCatName.text(currentCat.name);
    this.clickTimes.text(currentCat.clickTimes);
    this.catAvatar.attr('src', currentCat.avatar);
  }
};

const editAreaView = {
  init () {
    this.adminBtn = $('.admin');
    this.form = $('.form');
    this.formName = $('.form-name');
    this.formAvatarUrl = $('.form-avatar-url');
    this.formClickTimes = $('.form-click-times');
    this.saveBtn = $('.save');
    this.cancelBtn = $('.cancel');

    this.bindAdminBtn();
    this.bindSaveBtn();
    this.bindCancelBtn();
  },
  render () {
    const currentCat = octopus.getCurrentCat();
    this.formName.val(currentCat.name);
    this.formAvatarUrl.val(currentCat.avatar);
    this.formClickTimes.val(currentCat.clickTimes);
  },
  bindAdminBtn () {
    this.adminBtn.unbind('click').click(() => {
      this.render();
      this.form.show();
    });
  },
  bindSaveBtn () {
    this.saveBtn.unbind('click').click(() => {
      octopus.saveCat({
        name: this.formName.val(),
        avatar: this.formAvatarUrl.val(),
        clickTimes: this.formClickTimes.val() * 1
      });
    });
  },
  bindCancelBtn () {
    this.cancelBtn.unbind('click').click(() => {
      this.form.hide();
    });
  }
};

const octopus = {
  getCurrentCat () {
    return model.currentCat;
  },
  setCurrentCat (cat) {
    model.currentCat = cat;
    catDetailView.render();
    editAreaView.render();
  },
  getCats () {
    return model.cats;
  },
  init () {
    catListView.init();
    catDetailView.init();
    editAreaView.init();
    this.setCurrentCat(this.getCats()[0]);
  },
  saveCat (cat) {
    let currentCat = octopus.getCurrentCat();
    currentCat.name = cat.name;
    currentCat.avatar = cat.avatar;
    currentCat.clickTimes = cat.clickTimes;
    octopus.init();
  }
};

octopus.init();

// for (cat of cats) {
//   $('#ShangHai').append(`
//     <div class="cat-control">
//       ${cat.name}被点击了
//       <span class="click-times">${cat.clickTimes}</span>
//       次
//     </div>
//     <div class="cat-house">
//       ${cat.name}:
//       <img class="cat" src="${cat.avatar}" alt="${cat.name}">
//     </div>
//   `);
// }

// $('.cat').click(function () {
//   let herClickTimes = $(this).parent().prev().find('.click-times');
//   herClickTimes.text(herClickTimes.text() * 1 + 1);
// });