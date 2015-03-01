var App = {
    Views: {},
    Collections: {},
    Models: {},
    Router: {}
};

// models
App.Models.Film = Backbone.Model.extend({});

// collections
App.Collections.Films = Backbone.Collection.extend({
    url: '/index.php?r=site/films',
    model: App.Models.Film
});

var $spinner = '<img class="spinner" src="https://d13yacurqjgara.cloudfront.net/users/12755/screenshots/1037374/hex-loader2.gif" alt="spinner"/>';

// views
App.Views.FilmList = Backbone.View.extend({
    el: '.body-content',
    template: '#film-list-template',
    render: function (data) {
        // set spinner
        $(this.$el).html($spinner);

        // render template
        var that = this;
        App.TemplateManager.get('FilmList', function (template) {
            var generateHtml = _.template(template.html());
            var html = generateHtml({films: data});
            that.$el.html(html);
            return that;
        });
    }
});

App.Views.FilmSelect = Backbone.View.extend({
    el: '#films-select',
    template: '#film-select-template',
    events: {
        'change': 'filterFilms'
    },
    filterFilms: function (e) {
        var filteredFilms = new App.Collections.Films(films.where({'title': this.$el.val()}));
        switch (Backbone.history.fragment) {
            case 'map':
                App.filmMap.render(filteredFilms);
                break;
            case 'list':
                App.filmList.render(filteredFilms.models);
                break;
        }
    },
    render: function (data) {
        // render template
        var that = this;
        App.TemplateManager.get('FilmSelect', function (template) {
            var generateHtml = _.template(template.html());
            var titles = _.uniq(films.pluck('title'));
            var html = generateHtml({titles: titles});
            that.$el.html(html);
            that.$el.show().select2();
            return that;
        });
    }
});

App.Views.FilmMap = Backbone.View.extend({
    el: '.body-content',
    template: '#film-map-template',
    map: null,
    geocoder: null,
    films: [],
    initialize: function () {
        this.geocoder = new google.maps.Geocoder();
    },
    initMap: function () {
        var mapOptions = {
            center: {lat: 37.773972, lng: -122.431297},    // San Francisco
            zoom: 12
        };
        App.filmMap.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        App.filmMap.addMarkers();
    },
    init: function () {
        var that = this;
        $(function(){
            // when DOM is ready
            that.initMap();
        });
    },
    addMarkers: function () {
        var that = this;
        var icon = new google.maps.MarkerImage(
            "http://maps.google.com/mapfiles/kml/shapes/movies.png",
            null,
            null,
            /* Offset x axis 33% of overall size, Offset y axis 100% of overall size */
            new google.maps.Point(20, 32),
            new google.maps.Size(40, 40)
        );
        var bounds = new google.maps.LatLngBounds();
        _.each(that.films.models, function (film) {
            if (film.get('locations')) {
                that.geocoder.geocode({'address': film.get('locations') + ', San Francisco, CA, USA'}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var myLatLng = results[0].geometry.location;
                        that.map.setCenter(myLatLng);
                        that.map.fitBounds(bounds);
                        var marker = new google.maps.Marker({
                            map: that.map,
                            position: myLatLng,
                            clickable: true,
                            icon: icon
                        });
                        bounds.extend(myLatLng);
                        info = new google.maps.InfoWindow({
                            content: ''
                        });
                        google.maps.event.addListener(marker, 'click', function () {
                            info.setContent('Location: ' + film.get('locations') + '<br/>'
                                + 'Film: ' + film.get('title') + '<br/>'
                                + 'Release Year: ' + film.get('release_year') + '<br/>'
                                + 'Writer: ' + film.get('writer') + '<br/>'
                                + 'Director: ' + film.get('director') + '<br/>'
                                + 'Distributor: ' + film.get('distributor') + '<br/>'
                            );
                            info.open(that.map, marker);
                        });
                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        });
    },
    render: function (films) {
        this.films = films;
        // set spinner
        $(this.$el).html($spinner);

        // render template
        var that = this;
        App.TemplateManager.get('FilmMap', function (template) {
            var generateHtml = _.template(template.html());
            var html = generateHtml();
            that.$el.html(html);
            that.init();
            return that;
        });
    }
});

// router
App.Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'list': 'list',
        'map': 'map'
    }
});

// init views
App.filmSelect = new App.Views.FilmSelect();
App.filmList = new App.Views.FilmList();
App.filmMap = new App.Views.FilmMap();

// init router
App.routerInstance = new App.Router();
App.routerInstance
    .on('route:index', function () {
        App.routerInstance.navigate("/list", true);
    })
    .on('route:list', function () {
        App.filmSelect.filterFilms();
    })
    .on('route:map', function () {
        App.filmSelect.filterFilms();
    });

// template mechanism that downloads individual templates from html files and caches them
App.TemplateManager = {
    templates: {},
    get: function (id, callback) {
        var template = this.templates[id];
        if (template) {
            callback(template);
        } else {
            var that = this;
            $.get("/templates/" + id + ".html", function (template) {
                var $tmpl = $(template);
                that.templates[id] = $tmpl;
                callback($tmpl);
            });
        }
    }
};

// init data
var films = new App.Collections.Films();
films.fetch({
    success: function () {
        // init autocomplete select
        App.filmSelect.render(films);

        // init app routing
        Backbone.history.start();
    }
});


