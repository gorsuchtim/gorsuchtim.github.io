var app = angular.module("Justines", []);

/*------------------
Navigation Menu Controller
------------------------------*/

app.controller("SiteNav", function() {
	this.page = 1;

	this.setPage = function(pageNum) {
		this.page = pageNum;
	};

	this.isPage = function(checkPage) {
		return this.page === checkPage;
	};

});

/*---------------------------------------------
Controller to navigate between menu categories
------------------------------------------------*/

app.controller("MenuNavigation", function() {
	//this.menu = 1;

	this.setMenu = function(menuNum) {
		this.menu = menuNum;
	};

	this.isMenu = function(checkMenu) {
		return this.menu === checkMenu;
	};
});


/*---------------------------------------------
Controller to navigate between menu item tabs
------------------------------------------------*/

app.controller("MenuTabs", function() {
	this.tab = 1;

	this.setTab = function(menuTab) {
		this.tab = menuTab;
	};

	this.isTab = function(checkTab) {
		return this.tab === checkTab;
	};
});

/*----------------------------------------
Controller to navigate & create reviews
-----------------------------------------*/

app.controller("ReviewController", function() {
	this.review = {};

	this.addReview = function(items) {
		items.reviews.push(this.review);
		this.review = {};
	};
});

/*------------------------
Contact Options (email/phone) controller
--------------------------*/

app.controller("ContactOptions", function() {
	this.option = 1;
});



/* need to get data entered into textarea and push it to an empty array
then join that array
and store it */


/*-------------------
Menu products
---------------------*/

var cakeMenu = [

		{
			name: 'Formal',
			price: 'Call for Pricing',
			description: 'Tiramisu jelly beans sesame snaps wafer marzipan chocolate cake. Biscuit liquorice gummies cupcake pudding dragée.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://absoluteentertainment.biz/wp-content/uploads/2013/11/Wedding-Cake-Chocolate-Ganache-4-200x200.jpg',
				'http://www.brides.com/images/2015_bridescom/Editorial_Images/01/White-Wedding-Cakes/White-Wedding-Cakes-Carolly-Photography-PROMO.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps6423_CW1390C42.jpg',

			],		
			reviews: [
			{
				stars: 5,
				body: "Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes.",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Apple pie tootsie roll chupa chups carrot cake.",
				author: "captainObvious@aol.com"
			},

		]	
		},

		{
			name: 'Birthday',
			price: 75 + '-' + 100,
			description: 'Soufflé jelly beans macaroon fruitcake chocolate chupa chups. Icing candy tiramisu bonbon pudding.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://www.pepperl-fuchs.com/global/images_inet_lowres_GLOBAL/EC_SS_20140630_01_birhtday_cake_rdax_80.jpg',
				'http://www.brides.com/images/2015_bridescom/Editorial_Images/01/White-Wedding-Cakes/White-Wedding-Cakes-Carolly-Photography-PROMO.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps6423_CW1390C42.jpg',

			],	
			reviews: [
			{
				stars: 5,
				body: "Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Apple pie tootsie roll chupa chups carrot cake.",
				author: "captainObvious@aol.com"
			},

		]		
		},

		{
			name: 'Classic',
			price: 50,
			description: 'Cookie chocolate apple pie. Donut candy croissant chocolate pastry. Cake wafer gummies.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://content1.tastebook.com/content/photo/thumb/fehL8TaG13c213936303031383mKAXg8Rc_1385730076.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps25168_SF143315C11_05_1b.jpg',
				'http://photos.divinecupcake.com/images/mod_172/rv-cake-2_d19429.jpg',
			],	
			reviews: [
			{
				stars: 5,
				body: "Apple pie tootsie roll chupa chups carrot cake.",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Cupcake ipsum dolor sit amet jujubes",
				author: "captainObvious@aol.com"
			},

		]		
		},
		
		{
			name: 'Fondant',
			price: 100,
			description: 'Cookie candy canes chupa chups sugar plum soufflé cheesecake biscuit wafer muffin. Topping jelly-o.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://cdn.cakecentral.com/gallery/2015/03/831893pdaT_fondant-crown-cake-with-butter-cream-icing-and-fondant-designs_200x200.jpg',
				'http://allcakeideas.com/wp-content/uploads/2015/06/cake-decor-fondant-9.jpg',
				'http://charlysbakery.co.za/wp-content/uploads/2015/06/1Alice-in-Wonderland-figurines-e1434110037760.jpg',
			],	
			reviews: [
			{
				stars: 5,
				body: "Cupcake ipsum dolor sit amet jujubes",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Cupcake ipsum dolor sit amet jujubes",
				author: "captainObvious@aol.com"
			},

		]		
		},		
	];


var cupcakeMenu = [

		{
			name: 'Classic',
			price: 3 + '/each',
			description: 'Soufflé jelly beans macaroon fruitcake chocolate chupa chups. Icing candy tiramisu bonbon pudding.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://cakejournal.com/wp-content/uploads/2013/11/Baby-Blocks-Cupcakes-200x200.jpg',
				'http://www.brides.com/images/2015_bridescom/Editorial_Images/01/White-Wedding-Cakes/White-Wedding-Cakes-Carolly-Photography-PROMO.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps6423_CW1390C42.jpg',

			],		
			reviews: [
			{
				stars: 5,
				body: "Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake.",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "bonbon marzipan candy canes. Apple pie",
				author: "captainObvious@aol.com"
			},

		]	
		},

		{
			name: 'Twisted',
			price: 4.50 + '/each',
			description: 'Cookie chocolate apple pie. Donut candy croissant chocolate pastry. Cake wafer gummies.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://www.dhresource.com/albu_784555114_00-1.200x200/120pcs-lot-laser-cut-creative-cupcake-liners.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps25168_SF143315C11_05_1b.jpg',
				'http://photos.divinecupcake.com/images/mod_172/rv-cake-2_d19429.jpg',
			],	
			reviews: [
			{
				stars: 5,
				body: "sit amet jujubes bonbon marzipan candy canes.",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "sit amet jujubes bonbon marzipan candy canes..",
				author: "captainObvious@aol.com"
			},

		]		
		},
		
		{
			name: 'Custom',
			price: 6 + '/each',
			description: 'Cookie candy canes chupa chups sugar plum soufflé cheesecake biscuit wafer muffin. Topping jelly-o.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'https://s-media-cache-ak0.pinimg.com/236x/b4/c3/4d/b4c34d1e2d632012308695492c40ff9b.jpg',
				'http://allcakeideas.com/wp-content/uploads/2015/06/cake-decor-fondant-9.jpg',
				'http://charlysbakery.co.za/wp-content/uploads/2015/06/1Alice-in-Wonderland-figurines-e1434110037760.jpg',
			],	
			reviews: [
			{
				stars: 5,
				body: "Cookie chocolate apple pie. Donut candy croissant chocolate pastry. ",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Cake wafer gummies tiramisu carrot cake gingerbread.",
				author: "captainObvious@aol.com"
			},

		]		
		},
		
	];

var cookieMenu = [

		{
			name: 'Chocolate Chip',
			price: 3 + '/each',
			description: 'Soufflé jelly beans macaroon fruitcake chocolate chupa chups. Icing candy tiramisu bonbon pudding.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://static.caloriecount.about.com/images/medium/cookies-chocolate-chip-refrigerated-159243.jpg',
				'http://www.brides.com/images/2015_bridescom/Editorial_Images/01/White-Wedding-Cakes/White-Wedding-Cakes-Carolly-Photography-PROMO.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps6423_CW1390C42.jpg',

			],	
			reviews: [
			{
				stars: 5,
				body: "Cake wafer gummies tiramisu carrot cake gingerbread.",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "wafer gummies tiramisu carrot cake gingerbread.",
				author: "captainObvious@aol.com"
			},

		]		
		},

		{
			name: 'Oatmeal',
			price: 4.50 + '/each',
			description: 'Cookie chocolate apple pie. Donut candy croissant chocolate pastry. Cake wafer gummies.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://img2.timeinc.net/health/img/web/2012/10/blogs/pumpkin-chocolate-chip-cookies-200x200.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps25168_SF143315C11_05_1b.jpg',
				'http://photos.divinecupcake.com/images/mod_172/rv-cake-2_d19429.jpg',
			],	
			reviews: [
			{
				stars: 5,
				body: " Cake wafer gummies tiramisu carrot cake gingerbread.",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Cookie chocolate apple pie. ",
				author: "captainObvious@aol.com"
			},

		]		
		},
		
		{
			name: 'PB&J',
			price: 6 + '/each',
			description: 'Cookie candy canes chupa chups sugar plum soufflé cheesecake biscuit wafer muffin. Topping jelly-o.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://static.caloriecount.about.com/images/medium/cookies-peanut-butter-refrigerated-160154.jpg',
				'http://allcakeideas.com/wp-content/uploads/2015/06/cake-decor-fondant-9.jpg',
				'http://charlysbakery.co.za/wp-content/uploads/2015/06/1Alice-in-Wonderland-figurines-e1434110037760.jpg',
			],	
			reviews: [
			{
				stars: 5,
				body: "Cookie chocolate apple pie. Donut candy croissant chocolate pastry.",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Donut candy croissant chocolate pastry.",
				author: "captainObvious@aol.com"
			},

		]		
		},
		{
			name: 'Sugar',
			price: 3 + '/each',
			description: 'Soufflé jelly beans macaroon fruitcake chocolate chupa chups. Icing candy tiramisu bonbon pudding.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://www.recipe.com/images/tender-sugar-cookies-R106813-l.jpg',
				'http://www.brides.com/images/2015_bridescom/Editorial_Images/01/White-Wedding-Cakes/White-Wedding-Cakes-Carolly-Photography-PROMO.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps6423_CW1390C42.jpg',

			],		
			reviews: [
			{
				stars: 5,
				body: "Jelly-o croissant donut marzipan. Donut gingerbread wafer  ",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "lollipop dragée sweet roll dragée. Marshmallow pie bonbon.",
				author: "captainObvious@aol.com"
			},

		]	
		},		
		{
			name: 'Stuffed',
			price: 6 + '/each',
			description: 'Cookie candy canes chupa chups sugar plum soufflé cheesecake biscuit wafer muffin. Topping jelly-o.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://s1.grouprecipes.com/images/recipes/200/2680469499.jpg',
				'http://allcakeideas.com/wp-content/uploads/2015/06/cake-decor-fondant-9.jpg',
				'http://charlysbakery.co.za/wp-content/uploads/2015/06/1Alice-in-Wonderland-figurines-e1434110037760.jpg',
			],	
			reviews: [
			{
				stars: 5,
				body: "lollipop dragée sweet roll dragée. Marshmallow pie bonbon.",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Jelly-o croissant donut marzipan. Donut gingerbread wafer lollipop dragée sweet roll dragée.  ",
				author: "captainObvious@aol.com"
			},

		]		
		},
		{
			name: 'Iced',
			price: 3 + '/each',
			description: 'Soufflé jelly beans macaroon fruitcake chocolate chupa chups. Icing candy tiramisu bonbon pudding.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://www.crazyforcrust.com/wp-content/uploads/2014/11/Cutout-Sugar-Cookies-2-of-10w-200x200.jpg',
				'http://www.brides.com/images/2015_bridescom/Editorial_Images/01/White-Wedding-Cakes/White-Wedding-Cakes-Carolly-Photography-PROMO.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps6423_CW1390C42.jpg',

			],	
			reviews: [
			{
				stars: 5,
				body: "Marshmallow pie bonbon.",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Marshmallow pie bonbon.",
				author: "captainObvious@aol.com"
			},

		]		
		},
	];

var dessertMenu = [

		{
			name: 'Bars',
			price: 3 + '/each',
			description: 'Soufflé jelly beans macaroon fruitcake chocolate chupa chups. Icing candy tiramisu bonbon pudding.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://www.dessertnowdinnerlater.com/wp-content/uploads/2015/08/Chocolate-Caramel-Apple-Crumb-Bars-1-200x200.jpg',
				'http://www.brides.com/images/2015_bridescom/Editorial_Images/01/White-Wedding-Cakes/White-Wedding-Cakes-Carolly-Photography-PROMO.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps6423_CW1390C42.jpg',

			],	
			reviews: [
			{
				stars: 5,
				body: "Gummi bears ice cream dragée powder wafer marzipan cheesecake. Tiramisu bear claw gummi bears chocolate bar. ",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Muffin wafer croissant muffin.",
				author: "captainObvious@aol.com"
			},

		]		
		},

		{
			name: 'Fruit',
			price: 4.50 + '/each',
			description: 'Cookie chocolate apple pie. Donut candy croissant chocolate pastry. Cake wafer gummies.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'https://s-media-cache-ak0.pinimg.com/236x/5f/d0/be/5fd0be3e45ff8b9537776e95af89fa2b.jpg',
				'http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps25168_SF143315C11_05_1b.jpg',
				'http://photos.divinecupcake.com/images/mod_172/rv-cake-2_d19429.jpg',
			],		
			reviews: [
			{
				stars: 5,
				body: "Gummi bears ice cream dragée powder wafer marzipan cheesecake. Tiramisu bear claw gummi bears chocolate bar. ",
				author: "bob@gmail.com"
			},
			{
				stars:  3,
				body: "Muffin wafer croissant muffin.",
				author: "captainObvious@aol.com"
			},

		]	
		},
		
		{
			name: 'Pies',
			price: 15 + '/each',
			description: 'Cookie candy canes chupa chups sugar plum soufflé cheesecake biscuit wafer muffin. Topping jelly-o.',
			variety: 'Cupcake ipsum dolor sit amet jujubes bonbon marzipan candy canes. Apple pie tootsie roll chupa chups carrot cake. Sweet caramels candy sesame snaps sugar plum.',
			images: [
				'http://static.wixstatic.com/media/059971_310b46a2161240558a8701cf747322cc.jpg_256',
				'http://allcakeideas.com/wp-content/uploads/2015/06/cake-decor-fondant-9.jpg',
				'http://charlysbakery.co.za/wp-content/uploads/2015/06/1Alice-in-Wonderland-figurines-e1434110037760.jpg',
			],	
			reviews: [
			{
				stars: 5,
				body: "Muffin wafer croissant muffin.",
				author: "bob@gmail.com"
			},
			{
				stars: 3,
				body: "Chocolate bar tart cookie cake jelly beans candy canes.",
				author: "captainObvious@aol.com"
			},

		]		
		},		
	];