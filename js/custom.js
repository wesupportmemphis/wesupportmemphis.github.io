$(document).ready(function () {



	var afterFunction = function () {
		var isotopeBreakpoints = [
		
		{
			// Desktop
			min_width: 1680,
			columns: 6
		},
		
		{
			// iPad Landscape
			min_width: 1140,
			max_width: 1680,
			columns: 5
		},
		
		{
			// iPad Portrait
			min_width: 1024,
			max_width: 1440,
			columns: 4
		},
		
		{
			// iPhone Landscape
			min_width: 768,
			max_width: 1024,
			columns: 3
		},
		
		{
			// iPhone Portrait
			max_width: 768,
			columns: 1
		}
		
	];
	
	var $container = $('.items');
	$container.isotope({itemSelector: '.item'});	
	// hook to resize the portfolio items for fluidity / responsiveness
	$(window).resize(function () {
		console.log("working");
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		
		for (var i = 0; i < isotopeBreakpoints.length; i++) {
			if (windowWidth >= isotopeBreakpoints[i].min_width || !isotopeBreakpoints[i].min_width) {
				if (windowWidth < isotopeBreakpoints[i].max_width || !isotopeBreakpoints[i].max_width) {
					$container.find('.item').each(function () {
						$(this).width(Math.floor($container.width() / isotopeBreakpoints[i].columns));
					});
					
					break;
				}
			}
		}
	});
	};

	var weSupportMemphisFeed = new Instafeed({
		clientId: '3b3a690cbe444844b9d389430637975a',
        get: 'tagged',
        tagName: 'wesupportmemphis',
        sortBy: 'most-recent',
        limit: 25,
        template: '<li class="item"><a href="{{link}}"><figure><figcaption class="text-overlay"><div class="info"><i class="fa fa-heart fa-instagram-like"></i><p>{{likes}}</p></div></figcaption><img src="{{image}}" alt=""></figure></a></li>',
        resolution: 'low_resolution'
    });
    weSupportMemphisFeed.run();

	var userFeed = new Instafeed({
		clientId: '3b3a690cbe444844b9d389430637975a',
        get: 'tagged',
        tagName: 'supportmemphis',
        sortBy: 'most-recent',
        limit: 25,
        template: '<li class="item"><a href="{{link}}"><figure><figcaption class="text-overlay"><div class="info"><i class="fa fa-heart fa-instagram-like"></i><p>{{likes}}</p></div></figcaption><img src="{{image}}" alt=""></figure></a></li>',
        resolution: 'low_resolution',
        after: function () {
        	afterFunction();
        	if (!this.hasNext()) {
        		$('#load-more-button').addClass('disabled')
        		$('#load-more-button').html("That's all for now. Support memphis.");
        	}
        }
    });
    userFeed.run();

    $('#load-more-button').click(function (e) {
    	e.preventDefault();
    	userFeed.next();
    });
});