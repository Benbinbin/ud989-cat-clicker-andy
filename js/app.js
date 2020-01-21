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
	catId: 0 // show the first cat as default
};

var octopus = {
	init: function() {
		catListView.init();
		// model.catId = 0;
		catImgView.init();
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
		//increase the click counts
		model.cats[model.catId].click++;
		catImgView.render();
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
		});
		this.render();
	},
	render: function() {
		var cat = octopus.getCat();
		$('#cat-name').text(cat.name);
		$('#cat-img').attr('src', cat.src);
		$('#cat-count').text(cat.click);
	}
};

octopus.init();