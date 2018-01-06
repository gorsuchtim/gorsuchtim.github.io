app.directive("home", function() {
	return {
		restrict: 'E',
		templateUrl: ('home.html')
	};
});


app.directive("menuIndex", function() {
	return {
		restrict: 'E',
		templateUrl: ('menu-index.html')
	};
});

app.directive("menuReviews", function() {
	return {
		restrict: 'E',
		templateUrl: ('menu-reviews.html')
	};
});

app.directive("cakeMenu", function() {
	return {
		restrict: 'E',
		templateUrl: ('cake-menu.html'),
		controller: function() {			
			this.products = cakeMenu;
		},
		controllerAs: 'cakes'
	};
});

app.directive("cupcakeMenu", function() {
	return {
		restrict: 'E',
		templateUrl: ('cupcake-menu.html'),
		controller: function() {
			this.products = cupcakeMenu;
		},
		controllerAs: 'cupcakes'
	};
});

app.directive("cookieMenu", function() {
	return {
		restrict: 'E',
		templateUrl: ('cookie-menu.html'),
		controller: function() {
			this.products = cookieMenu;
		},
		controllerAs: 'cookies'
	};
});

app.directive("dessertMenu", function() {
	return {
		restrict: 'E',
		templateUrl: ('dessert-menu.html'),
		controller: function() {
			this.products = dessertMenu;
		},
		controllerAs: 'desserts'
	};
});

app.directive("servicesIndex", function() {
	return {
		restrict: 'E',
		templateUrl: ('services-index.html')
	};
});

app.directive("aboutIndex", function() {
	return {
		restrict: 'E',
		templateUrl: ('about-index.html')
	};
});

app.directive("contactIndex", function() {
	return {
		restrict: 'E',
		templateUrl: ('contact-index.html')
	};
});