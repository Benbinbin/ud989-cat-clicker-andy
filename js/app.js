/* Model */
var model = {
	cats: [
		{
			click: 0,
			name: "cat1",
			src: "img/cat_picture1.jpg"
		},
		{
			click: 0,
			name: "cat2",
			src: "img/cat_picture2.jpeg"
		},
		{
			click: 0,
			name: "cat3",
			src: "img/cat_picture3.jpeg"
		},
		{
			click: 0,
			name: "cat4",
			src: "img/cat_picture4.jpeg"
		},
		{
			click: 0,
			name: "cat5",
			src: "img/cat_picture5.jpeg"
		}
	],
	catId: 0, // show the first cat as default
	adminDisplay: false
};

var octopus = {
	init: function() {
		catListView.init();
		catImgView.init();
		adminView.init();
	},

	getData: function() {
		// get the cats list from model
		return model.cats;
	},

	setId: function(id) {
		// set the current cat Id
		model.catId = id;
	},

	getCat: function() {
		return model.cats[model.catId];
	},

	addCount: function() {
		// increase the click counts
		model.cats[model.catId].click++;
		catImgView.render();
	},

	adminStatus: function() {
		// get the state of admin
		return model.admin;
	},
	showAdmin: function() {
		model.adminDisplay = true;
		adminView.show();
	},
	hideAdmin: function() {
		model.adminDisplay = false;
		adminView.hide();
	},
	update: function() {
		model.cats[model.catId] = adminView.save();
		catListView.render();
		catImgView.render();
		this.hideAdmin();
	}
};

var catListView = {
	init: function() {
		// get the DOM elements
		this.button = $('#cat-button');
		this.render();
	},

	// render the cat list view
	render: function() {
		this.button.empty(); // empty the button list
		var cats = octopus.getData();
		for(var i = 0; i < cats.length; i++) {
			cat = cats[i];
			var elem = $("<button></button>");
			elem.text(cat.name);
			this.button.append(elem);
			// create a listener on the button
			// use IIFE to lock the i which is relative to cat
			elem.on('click', (function(lockIndex) {
				// when cat list clicked the relative id set as current cat
				return function() {
					octopus.setId(lockIndex);
					catImgView.render();
					octopus.hideAdmin();
			}
			})(i));
		};
	}
};

var catImgView = {
	init: function() {
		// get the DOM elements
		this.catName = $('#cat-name');
		this.catImg = $('#cat-img');
		this.count = $('#cat-count');

		// set listener on click
		this.catImg.on('click', function() {
			octopus.addCount();
			adminView.render();
		});
		this.render();
	},
	render: function() {
		var cat = octopus.getCat();
		this.catName.text(cat.name);
		$('#cat-img').attr('src', cat.src);
		$('#cat-count').text(cat.click);
	}
};

var adminView = {
	init: function() {
		// get the DOM elements
		this.adminButton = $('#admin-button');
		this.cancelButton = $('#admin-cancel');
		this.saveButton = $('#admin-save');
		this.adminForm = $('#admin');

		// add listener to button
		this.adminButton.on('click', function() {
			octopus.showAdmin();
		});
		this.cancelButton.on('click', function() {
			octopus.hideAdmin();
		});
		this.saveButton.on('click', function() {
			octopus.update();
		});

		// close the admin as default
		$('#admin').hide()
	},
	render: function() {
		var cat = octopus.getCat();
		// don't use attr set the value default~
		$('#name').prop('value', cat.name);
		$('#url').prop('value', cat.src);
		$('#click').prop('value', cat.click);
	},
	show: function() {
		this.render();
		this.adminForm.show();
	},
	hide: function() {
		this.adminForm.hide();
	},
	save: function() {
		var catNew = {
			click: $('#click').val(),
			name: $('#name').val(),
			src: $('#url').val(),
		}
		return catNew;
	}
}

octopus.init();