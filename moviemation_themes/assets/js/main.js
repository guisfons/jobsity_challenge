const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// API
const url = window.location.search
const apiKey = 'api_key=197192daa2a463199eec99eeded92000'
const baseUrl = 'https://api.themoviedb.org/3/'
const imgUrl = 'https://image.tmdb.org/t/p/w500';

const movieBaseUrl = baseUrl + 'movie/'
const upcomingUrl = movieBaseUrl + 'upcoming?' + apiKey
const movieUrl = baseUrl + 'discover/movie?sort_by=popularity.desc&' + apiKey
const movieSearch = baseUrl + 'search/movie?' + apiKey
const movieId = url.substring(url.lastIndexOf('?id=') + 4)
const movieListUrl = baseUrl + 'movie/' + movieId + '/lists'
const movieDetail = movieBaseUrl + movieId + '?' + apiKey
const movieReview = movieBaseUrl + movieId + '/reviews?' + apiKey
const movieTrailer = movieBaseUrl + movieId + '/videos?' + apiKey
const movieSimilar = movieBaseUrl + movieId + '/similar?' + apiKey

const actorUrl = baseUrl + 'person/'
const actorId = url.substring(url.lastIndexOf('?id=') + 4)
const actorDetailUrl = actorUrl + actorId + '?' + apiKey
const actorGalleyUrl = actorUrl + actorId + '/images?' + apiKey
const actorCastUrl = actorUrl + actorId + '/movie_credits?' + apiKey
const listActorUrl = baseUrl + 'person/popular?'
const popularActorUrl = actorUrl + 'popular?' + apiKey
const actorSearch = baseUrl + 'search/person?' + apiKey

const castUrl = movieBaseUrl + movieId + '/credits?' + apiKey

const genreUrl = baseUrl + 'genre/movie/list?' + apiKey

const searchParams = new URLSearchParams(window.location.search)

let genresList = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]

// fetch(url).then(res => res.json()).then(data => {

// })

let attempts;
function doAjaxRequest() {
    attempts = 0;
    doAjaxRequestLoop();
}

function getMovies(url) {
    const fetchMovies = fetch(url).then(res => res.json()).then(data => {
        if (document.body.contains($('.actor'))) {
            let dateFormated = new Date(data.release_date)

            let genresName = data.genres.map(function (e) {
                return e.name
            }).join(', ')

            $('.actor-details__movies').innerHTML += `
            <article class="movie-list__movie">
                <a href="/movies/movie/?${data.title.replace(/\s+/g, '-').replace(':', '').replace('"', '').replace('.', '').toLowerCase() + '?id=' + data.id}">
                    <figure>
                        <img src="${data.poster_path ? imgUrl + data.poster_path : 'http://via.placeholder.com/500x750'}" alt="${data.title}" loading="lazy">
                    </figure>
                    <div>
                        <h3>${data.title}</h3>
                        <p>Release: <time datetime="${dateFormated.toLocaleDateString('en-US')}">${dateFormated.toLocaleDateString('en-US')}</time></p>
                        <p class="upcoming-movies__genre">Genre: ${genresName}</p>
                    </div>
                </a>
            </article>`
        } else {
            if (data.results.length !== 0) {
                listMovies(data.results)
            }
        }
    }).catch(function() {
        setTimeout(function(){ return fetchMovies}, 500)
    })
}

function getMovie(url) {
    const fetchMovie = fetch(url).then(res => res.json()).then(data => {
        loader()

        const { poster_path, original_title, popularity, release_date, title, genres, original_language, production_companies, overview, id } = data
        let dateFormated = new Date(release_date)

        let find = genresList.filter(e => {
            return genres.includes(e.id)
        })

        let genresName = find.map(function (e) {
            return e.name
        }).join(', ')

        if(document.body.contains($('.favorite'))) {
            $('.favorite-movies').innerHTML += `
            <article class="upcoming-movies__movie">
                <a href="/movies/movie/?${title.replace(/\s+/g, '-').replace(':', '').replace('"', '').replace('.', '').toLowerCase() + '?id=' + id}">
                    <figure>
                        <img src="${poster_path ? imgUrl + poster_path : 'http://via.placeholder.com/500x750'}" alt="${title}" loading="lazy">
                    </figure>
                    <div>
                        <h3>${title}</h3>
                        <p>Release: <time datetime="${dateFormated.toLocaleDateString('en-US')}">${dateFormated.toLocaleDateString('en-US')}</time></p>
                        <p class="upcoming-movies__genre">Genre: ${genresName}</p>
                    </div>
                </a>
            </article>`
        } else {
            $('.movie-details').innerHTML += `
            <div class="wrapper movie-details__info">
                <figure class="movie-details__photo"><img src="${poster_path ? imgUrl + poster_path : 'http://via.placeholder.com/500x750'}" alt="${title}" loading="lazy"><span class="movie-details__favorite"></span></figure>
                <div class="movie-details__header">
                    <h1 class="movie-details__title">${title}</h1>
                    <article>
                        <p class="movie-details__release"><strong>Release:</strong> ${dateFormated.toLocaleDateString('en-US')}</p>
                        <p class="movie-details__alternative"><strong>Alternative titles:</strong> ${original_title}</p>
                        <p class="movie-details__genre"><strong>Genres: </strong></p>
                        <p class="movie-details__language"><strong>Original Language:</strong> ${languageCodes(original_language.toUpperCase())}</p>
                        <p class="movie-details__cast"><strong>Cast:</strong> </p>
                        <p class="movie-details__companies"><strong>Prodution Companies:</strong> </p>
                        <p class="movie-details__popularity"><strong>Popularity:</strong> ${popularity}</p>
                        <p class="movie-details__overview"><strong>Overview:</strong> ${overview}</p>
                    </article>
                </div>
            </div>
            <figure class="wrapper movie-details__trailer"></figure>
            <div class="movie-details__reviews"><div class="wrapper"><h3>Reviews</h3></div></div>
            <div class="movie-details__similar"></div>`
    
            genres.forEach(function (genre, i) {
                $('.movie-details__genre').innerHTML += '<span>' + genre.name + '</span>'
            })
    
            production_companies.forEach(function (company, i) {
                $('.movie-details__companies').innerHTML += '<span>' + company.name + '</span>'
            })
        }
    }).catch(function() {
        setTimeout(function(){ return fetchMovie}, 500)
    })

    if(document.body.contains($('.movie-details'))) {
        getReviews(movieReview)
        getCast(castUrl)
        getSimilarMovie(movieSimilar)
        getTrailer(movieTrailer)
    }

}

function getSimilarMovie(url) {
    const fetchSimilarMovie = fetch(url).then(res => res.json()).then(data => {
        loader()
        $('.movie-details__similar').innerHTML += '<h3>Similar Movies</h3>'
        data.results.forEach(function (data, i) {
            const { poster_path, title, release_date, genre_ids, id } = data
            let dateFormated = new Date(release_date)
    
            let find = genresList.filter(e => {
                return genre_ids.includes(e.id)
            })
    
            let genresName = find.map(function (e) {
                return e.name
            }).join(', ')
    
            if (i < 5) {
                $('.movie-details__similar').innerHTML += `
                <article>
                    <a href="/movies/movie/?${title.replace(/\s+/g, '-').replace(':', '').replace('"', '').replace('.', '').toLowerCase() + '?id=' + id}">
                        <figure>
                            <img src="${poster_path ? imgUrl + poster_path : 'http://via.placeholder.com/500x750'}" alt="${title}" loading="lazy">
                        </figure>
                        <div>
                            <h3>${title}</h3>
                            <p>Release: <time datetime="${dateFormated.toLocaleDateString('en-US')}">${dateFormated.toLocaleDateString('en-US')}</time></p>
                            <p class="upcoming-movies__genre">Genre: ${genresName}</p>
                        </div>
                    </a>
                </article>`
            }
        })
    }).catch(function() {
        setTimeout(function(){ return fetchSimilarMovie}, 500)
    })
}

function getReviews(url) {
    const fetchReviews = fetch(url).then(res => res.json()).then(data => {
        loader()
        data.results.forEach(function (data, i) {
            const { author, content } = data
            $('.movie-details__reviews .wrapper').innerHTML += `
            <article>
                <p>${content}</p>
                <h4>${author}</h4>
            </article>`
        })
    }).catch(function() {
        setTimeout(function(){ return fetchReviews}, 500)
    })
}

function getCast(url) {
    const fetchCast = fetch(url).then(res => res.json()).then(data => {
        if (document.body.contains($('.movie'))) {
            data.cast.forEach(function (cast, i) {
                const { id, name } = cast
                $('.movie-details__cast').innerHTML += '<a href="/actors/actor/?' + name.replace(/\s+/g, '-').replace(':', '').replace('"', '').replace('.', '').toLowerCase() + '?id=' + id + '">' + name + '</a>'
            })
        }
    
        if (document.body.contains($('.actor'))) {
            data.cast.forEach(function (cast, i) {
                const { title, character, release_date, poster_path, id, genre_ids } = cast
                let dateFormated = new Date(release_date)
    
                let find = genresList.filter(e => {
                    return genre_ids.includes(e.id)
                })
    
                let genresName = find.map(function (e) {
                    return e.name
                }).join(', ')
    
                $('.actor-details__movies').innerHTML += `
                <article data-id="${i}" data-release="${release_date}">
                    <a href="/movies/movie/?${title.replace(/\s+/g, '-').replace(':', '').replace('"', '').replace('.', '').toLowerCase() + '?id=' + id}">
                        <figure>
                            <img src="${poster_path ? imgUrl + poster_path : 'http://via.placeholder.com/500x750'}" alt="${title}" loading="lazy">
                        </figure>
                        <div>
                            <h3>${title}</h3>
                            <p class="upcoming-movies__character">Character: ${character}</p>
                            <p>Release: <time datetime="${dateFormated.toLocaleDateString('en-US')}">${dateFormated.toLocaleDateString('en-US')}</time></p>
                            <p class="upcoming-movies__genre">Genre: ${genresName}</p>
                        </div>
                    </a>
                </article>`
            })
    
            var movies = new Array($('.actor-details__movies article'));
            movies.sort(function (a, b) {
                return $(b).data('release') - $(a).data('release');
            })
        }
    
        if (document.body.contains($('.actor-list'))) {
            data.cast.forEach(function (cast, i) {
                const { name, profile_path, id } = cast
                $('.actor-list__list').innerHTML += `
                <article class="actor-list__actor" data-id="${i}">
                    <a href="/actors/actor/?${name.replace(/\s+/g, '-').replace(':', '').toLowerCase() + '?id=' + id}">
                        <figure>
                            <img src="${profile_path ? imgUrl + profile_path : 'http://via.placeholder.com/500x750'}" alt="${name}" loading="lazy">
                        </figure>
                        <h3>${name}</h3>
                    </a>
                </article>`
            })
        }
    }).catch(function() {
        setTimeout(function(){ return fetchCast}, 500)
    })
}

function getTrailer(url) {
    const fetchTrailer = fetch(url).then(res => res.json()).then(data => {
        loader()
        if (document.body.contains($('.movie'))) {
            data.results.forEach(function (data, i) {
                const { key, type, name } = data
                if (name == 'Official Trailer' && type == 'Trailer') {
                    $('.movie-details__trailer').innerHTML += '<iframe src="https://www.youtube.com/embed/' + key + '?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                }
            })
        }
    }).catch(function() {
        setTimeout(function(){ return fetchTrailer}, 500)
    })
}

function getActors(url) {
    const fetchActors = fetch(url).then(res => res.json()).then(data => {
        loader()
        listActors(data.results)
    }).catch(function() {
        setTimeout(function(){ return fetchActors}, 500)
    })
}

function getActor(url) {
    const fetchActor = fetch(url).then(res => res.json()).then(data => {
        loader()

        const { id, profile_path, name, birthday, place_of_birth, deathday, homepage, popularity, biography } = data
        let birthdayFormated = new Date(birthday)
        let deathdayFormated = new Date(deathday)
    
        $('.actor-details').innerHTML += `
        <div class="wrapper actor-details__info">
            <figure class="actor-details__photo"><img src="${profile_path ? imgUrl + profile_path : 'http://via.placeholder.com/500x750'}" alt="${name}" loading="lazy"></figure>
            <div class="actor-details__header">
                <h1 class="actor-details__title">${name}</h1>
                <span class="actor-details__birthday">
                    ${birthdayFormated.toLocaleDateString('en-US')} ${deathday ? ' - ' + deathdayFormated.toLocaleDateString('en-US') : '' + ' (Age: ' + getAge(birthdayFormated.toLocaleDateString('en-US')) + ')'}
                </span>
                <article>
                    <p class="actor-details__birth"><strong>Place of birth:</strong> ${place_of_birth}</p>
                    <p class="actor-details__website"><strong>Website: </strong> ${homepage ? homepage : ''}</p>
                    <p class="actor-details__popularity"><strong>Popularity:</strong> ${popularity}</p>
                    <p class="actor-details__bio"><strong>Biography:</strong> ${biography}</p>
                </article>
            </div>
        </div>
        <div class="actor-details__gallery"><h3>Gallery</h3></div>
        <div class="actor-details__movies"><h3>Known For</h3></div>`
    }).catch(function() {
        setTimeout(function(){ return fetchActor}, 500)
    })

    getGallery(actorGalleyUrl)
    getCast(actorCastUrl)
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getGallery(url) {
    const fetchGallery = fetch(url).then(res => res.json()).then(data => {
        loader()

        if (document.body.contains($('.actor'))) {
            data.profiles.forEach(function (profile, i) {
                if (i < 10) {
                    const { file_path } = profile
                    $('.actor-details__gallery').innerHTML += '<figure><img src="' + imgUrl + '/' + file_path + '" loading="lazy"></figure>'
                }
            })
        }
    }).catch(function() {
        setTimeout(function(){ return fetchGallery}, 500)
    })
}

function listMovies(data) {
    loader()

    data.forEach(function (movie, i) {
        const { poster_path, title, release_date, genre_ids, id } = movie
        let dateFormated = new Date(release_date)

        let find = genresList.filter(e => {
            return genre_ids.includes(e.id)
        })

        let genresName = find.map(function (e) {
            return e.name
        }).join(', ')

        let movieCard = 
        `<article class="upcoming-movies__movie">
            <a href="/movies/movie/?${title.replace(/\s+/g, '-').replace(':', '').replace('"', '').replace('.', '').toLowerCase() + '?id=' + id}">
                <figure>
                    <img src="${poster_path ? imgUrl + poster_path : 'http://via.placeholder.com/500x750'}" alt="${title}" loading="lazy">
                </figure>
                <div>
                    <h3>${title}</h3>
                    <p>Release: <time datetime="${dateFormated.toLocaleDateString('en-US')}">${dateFormated.toLocaleDateString('en-US')}</time></p>
                    <p class="upcoming-movies__genre">Genre: ${genresName}</p>
                </div>
            </a>
        </article>`

        if (document.body.contains($('.home'))) {
            if (i < 10) {
                $('.upcoming-movies').innerHTML += movieCard
            }
        }

        if (document.body.contains($('.movie-list'))) {
            $('.movie-list__list').innerHTML += movieCard
        }

        if (document.body.contains($('.search-details__movies'))) {
            $('.search-details__movies').innerHTML += movieCard
        }
    })

    if (document.body.contains($('.actor-list'))) {
        let idMovie = data[0].id
        let titleMovie = data[0].title

        $('.actor-list__list').innerHTML += '<h2>' + titleMovie + '</h2>'
        getCast(movieBaseUrl + idMovie + '/credits?' + apiKey)
    }
}

function listActors(data) {
    data.forEach(function (actor, i){
        const { profile_path, name, id } = actor

        let actorCard = 
        `<article class="popular-actors__actor">
            <a href="/actors/actor/?${name.replace(/\s+/g, '-').replace(':', '').toLowerCase() + '?id=' + id}">
                <figure>
                    <img src="${profile_path ? imgUrl + profile_path : 'http://via.placeholder.com/500x750'}" alt="${name}" loading="lazy">
                </figure>
                <h3>${name}</h3>
            </a>
        </article>`

        if (document.body.contains($('.home'))) {
            if (i < 10) {
                $('.popular-actors').innerHTML += actorCard
            }
        }

        if (document.body.contains($('.actor-list__list'))) {
            $('.actor-list__list').innerHTML += actorCard
        }

        if (document.body.contains($('.search-details__actors'))) {
            $('.search-details__actors').innerHTML += actorCard
        }
    })
}

function filter() {
    genres(genreUrl)

    let loadMore = $('.movie-list__more, .actor-list__more')
    let filterForm = $('.movie-list__filter form, .actor-list__filter')
    let title = filterForm.querySelector('#title')
    let year = filterForm.querySelector('#year')
    let genre = filterForm.querySelector('#genre')

    // loadMore.addEventListener('click', nextPage(movieUrl))

    if (document.body.contains($('.movie-list__list'))) {
        title.addEventListener('change', function (e) {
            if (e.value != '') {
                empty($('.movie-list__list'))
                getMovies(movieSearch + '&query=' + title.value)
                nextPage(movieSearch + '&query=' + title.value)
            } else {
                empty($('.movie-list__list'))
                getMovies(movieUrl)
            }
        })

        year.addEventListener('change', function (e) {
            if (e.value != '') {
                empty($('.movie-list__list'))
                getMovies(movieUrl + '&with_genres=' + genre.value + '&primary_release_year=' + year.value)
                nextPage(movieUrl + '&with_genres=' + genre.value + '&primary_release_year=' + year.value)
            } else {
                empty($('.movie-list__list'))
                getMovies(movieUrl)
            }
        })

        genre.addEventListener('change', function () {
            if ($(this).value != '') {
                empty($('.movie-list__list'))
                getMovies(movieUrl + '&with_genres=' + genre.value + '&primary_release_year=' + year.value)
                nextPage(movieUrl + '&with_genres=' + genre.value + '&primary_release_year=' + year.value)
            } else {
                empty($('.movie-list__list'))
                getMovies(movieUrl)
            }
        })
    }

    // Filter Person
    let personName = filterForm.querySelector('#name')

    if (document.body.contains($('.actor-list__filter'))) {
        personName.addEventListener('change', function () {
            if ($(this).value != '') {
                empty($('.actor-list__list'))
                getActors(actorSearch + '&query=' + personName.value)
            } else {
                empty($('.actor-list__list'))
                getActors(popularActorUrl)
            }
        })

        title.addEventListener('change', function () {
            if ($(this).value != '') {
                empty($('.actor-list__list'))
                getMovies(movieSearch + '&query=' + title.value)
            } else {
                empty($('.actor-list__list'))
                getActors(popularActorUrl)
            }
        })
    }

}

function genres(url) {
    const fetchGenre = fetch(url).then(res => res.json()).then(data => {
        loader()

        if (document.body.contains($('.movie-list__filter'))) {
            data.genres.forEach(function (genre) {
                const { id, name } = genre
                $('select#genre').innerHTML += '<option value="' + id + '">' + name + '</option>'
            })
        }
    }).catch(function() {
        setTimeout(function(){ return fetchGenre}, 500)
    })
}

function languageCodes(code) {
    switch (code) {
        case 'AB':
            code = 'Abkhazian';
            break;
        case 'AA':
            code = 'Afar';
            break;
        case 'AF':
            code = 'Afrikaans';
            break;
        case 'SQ':
            code = 'Albanian';
            break;
        case 'AM':
            code = 'Amharic';
            break;
        case 'AR':
            code = 'Arabic';
            break;
        case 'HY':
            code = 'Armenian';
            break;
        case 'AS':
            code = 'Assamese';
            break;
        case 'AY':
            code = 'Aymara';
            break;
        case 'AZ':
            code = 'Azerbaijani';
            break;
        case 'BA':
            code = 'Bashkir';
            break;
        case 'EU':
            code = 'Basque';
            break;
        case 'BN':
            code = 'Bengali, Bangla';
            break;
        case 'DZ':
            code = 'Bhutani';
            break;
        case 'BH':
            code = 'Bihari';
            break;
        case 'BI':
            code = 'Bislama';
            break;
        case 'BR':
            code = 'Breton';
            break;
        case 'BG':
            code = 'Bulgarian';
            break;
        case 'MY':
            code = 'Burmese';
            break;
        case 'BE':
            code = 'Byelorussian';
            break;
        case 'KM':
            code = 'Cambodian';
            break;
        case 'CA':
            code = 'Catalan';
            break;
        case 'ZH':
            code = 'Chinese';
            break;
        case 'CO':
            code = 'Corsican';
            break;
        case 'HR':
            code = 'Croatian';
            break;
        case 'CS':
            code = 'Czech';
            break;
        case 'DA':
            code = 'Danish';
            break;
        case 'NL':
            code = 'Dutch';
            break;
        case 'EN':
            code = 'English, American';
            break;
        case 'EO':
            code = 'Esperanto';
            break;
        case 'ET':
            code = 'Estonian';
            break;
        case 'FO':
            code = 'Faeroese';
            break;
        case 'FJ':
            code = 'Fiji';
            break;
        case 'FI':
            code = 'Finnish';
            break;
        case 'FR':
            code = 'French';
            break;
        case 'FY':
            code = 'Frisian';
            break;
        case 'GD':
            code = 'Gaelic (Scots Gaelic)';
            break;
        case 'GL':
            code = 'Galician';
            break;
        case 'KA':
            code = 'Georgian';
            break;
        case 'DE':
            code = 'German';
            break;
        case 'EL':
            code = 'Greek';
            break;
        case 'KL':
            code = 'Greenlandic';
            break;
        case 'GN':
            code = 'Guarani';
            break;
        case 'GU':
            code = 'Gujarati';
            break;
        case 'HA':
            code = 'Hausa';
            break;
        case 'IW':
            code = 'Hebrew';
            break;
        case 'HI':
            code = 'Hindi';
            break;
        case 'HU':
            code = 'Hungarian';
            break;
        case 'IS':
            code = 'Icelandic';
            break;
        case 'IN':
            code = 'Indonesian';
            break;
        case 'IA':
            code = 'Interlingua';
            break;
        case 'IE':
            code = 'Interlingue';
            break;
        case 'IK':
            code = 'Inupiak';
            break;
        case 'GA':
            code = 'Irish';
            break;
        case 'IT':
            code = 'Italian';
            break;
        case 'JA':
            code = 'Japanese';
            break;
        case 'JW':
            code = 'Javanese';
            break;
        case 'KN':
            code = 'Kannada';
            break;
        case 'KS':
            code = 'Kashmiri';
            break;
        case 'KK':
            code = 'Kazakh';
            break;
        case 'RW':
            code = 'Kinyarwanda';
            break;
        case 'KY':
            code = 'Kirghiz';
            break;
        case 'RN':
            code = 'Kirundi';
            break;
        case 'KO':
            code = 'Korean';
            break;
        case 'KU':
            code = 'Kurdish';
            break;
        case 'LO':
            code = 'Laothian';
            break;
        case 'LA':
            code = 'Latin';
            break;
        case 'LV':
            code = 'Latvian, Lettish';
            break;
        case 'LN':
            code = 'Lingala';
            break;
        case 'LT':
            code = 'Lithuanian';
            break;
        case 'MK':
            code = 'Macedonian';
            break;
        case 'MG':
            code = 'Malagasy';
            break;
        case 'MS':
            code = 'Malay';
            break;
        case 'ML':
            code = 'Malayalam';
            break;
        case 'MT':
            code = 'Maltese';
            break;
        case 'MI':
            code = 'Maori';
            break;
        case 'MR':
            code = 'Marathi';
            break;
        case 'MO':
            code = 'Moldavian';
            break;
        case 'MN':
            code = 'Mongolian';
            break;
        case 'NA':
            code = 'Nauru';
            break;
        case 'NE':
            code = 'Nepali';
            break;
        case 'NO':
            code = 'Norwegian';
            break;
        case 'OC':
            code = 'Occitan';
            break;
        case 'OR':
            code = 'Oriya';
            break;
        case 'OM':
            code = 'Oromo, Afan';
            break;
        case 'PS':
            code = 'Pashto, Pushto';
            break;
        case 'FA':
            code = 'Persian';
            break;
        case 'PL':
            code = 'Polish';
            break;
        case 'PT':
            code = 'Portuguese';
            break;
        case 'PA':
            code = 'Punjabi';
            break;
        case 'QU':
            code = 'Quechua';
            break;
        case 'RM':
            code = 'Rhaeto-Romance';
            break;
        case 'RO':
            code = 'Romanian';
            break;
        case 'RU':
            code = 'Russian';
            break;
        case 'SM':
            code = 'Samoan';
            break;
        case 'SG':
            code = 'Sangro';
            break;
        case 'SA':
            code = 'Sanskrit';
            break;
        case 'SR':
            code = 'Serbian';
            break;
        case 'SH':
            code = 'Serbo-Croatian';
            break;
        case 'ST':
            code = 'Sesotho';
            break;
        case 'TN':
            code = 'Setswana';
            break;
        case 'SN':
            code = 'Shona';
            break;
        case 'SD':
            code = 'Sindhi';
            break;
        case 'SI':
            code = 'Singhalese';
            break;
        case 'SS':
            code = 'Siswati';
            break;
        case 'SK':
            code = 'Slovak';
            break;
        case 'SL':
            code = 'Slovenian';
            break;
        case 'SO':
            code = 'Somali';
            break;
        case 'ES':
            code = 'Spanish';
            break;
        case 'SU':
            code = 'Sudanese';
            break;
        case 'SW':
            code = 'Swahili';
            break;
        case 'SV':
            code = 'Swedish';
            break;
        case 'TL':
            code = 'Tagalog';
            break;
        case 'TG':
            code = 'Tajik';
            break;
        case 'TA':
            code = 'Tamil';
            break;
        case 'TT':
            code = 'Tatar';
            break;
        case 'TE':
            code = 'Tegulu';
            break;
        case 'TH':
            code = 'Thai';
            break;
        case 'BO':
            code = 'Tibetan';
            break;
        case 'TI':
            code = 'Tigrinya';
            break;
        case 'TO':
            code = 'Tonga';
            break;
        case 'TS':
            code = 'Tsonga';
            break;
        case 'TR':
            code = 'Turkish';
            break;
        case 'TK':
            code = 'Turkmen';
            break;
        case 'TW':
            code = 'Twi';
            break;
        case 'UK':
            code = 'Ukrainian';
            break;
        case 'UR':
            code = 'Urdu';
            break;
        case 'UZ':
            code = 'Uzbek';
            break;
        case 'VI':
            code = 'Vietnamese';
            break;
        case 'VO':
            code = 'Volapuk';
            break;
        case 'CY':
            code = 'Welsh';
            break;
        case 'WO':
            code = 'Wolof';
            break;
        case 'XH':
            code = 'Xhosa';
            break;
        case 'JI':
            code = 'Yiddish';
            break;
        case 'YO':
            code = 'Yoruba';
            break;
        case 'ZU':
            code = 'Zulu';
            break;
        default:
            break;
    }

    return code;
}

function nextPage(url) {
    let page = 1

    window.addEventListener('scroll', function () {
        let scrollHeight = document.documentElement.scrollHeight
        let scrollPosition = window.innerHeight + window.pageYOffset;

        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            page++

            if (document.body.contains($('.movie-list'))) {
                getMovies(url + '&page=' + page)
            }

            if (document.body.contains($('.actor-list'))) {
                getActors(url + apiKey + page)
            }
        }
    })
}

function loader() {
    $('.lds-roller-container').classList.add('lds-roller-container--hide')
}

function search(url) {
    $('.search-details').innerHTML += `<section class="wrapper search-details__movies"><h2>Movies with "${searchParams.get('s')}" in the title</h2></section>`
    $('.search-details').innerHTML += `<section class="wrapper search-details__actors"><h2>Actors with "${searchParams.get('s')}" in the name</h2></section>`
    getMovies(movieSearch + '&query=' + searchParams.get('s'))
    getActors(actorSearch + '&query=' + searchParams.get('s'))
}

function wishlist() {
    $('.favorite-movies').innerHTML += `<h2>Favorite Movies</h2>`
    $$('.favorite-movie-ids').forEach(function(e) {
        getMovie(movieBaseUrl + e.value + '?' + apiKey)
    }) 
}

function empty(element) {
    while(element.firstElementChild) {
       element.firstElementChild.remove();
    }
}
  
window.addEventListener('DOMContentLoaded', function () {
    $('body').innerHTML += '<div class="wrapper"></div>'

    if (document.body.contains($('.home'))) {
        getMovies(upcomingUrl)
        getActors(popularActorUrl)
    }

    if (document.body.contains($('.movie-list'))) {
        getMovies(movieUrl)
    }

    if (document.body.contains($('.movie-list__filter'))) {
        filter()
    }

    if (document.body.contains($('.actor-list'))) {
        getActors(listActorUrl + apiKey + '&sort_by=name.asc')
    }

    if (document.body.contains($('.actor-list__filter'))) {
        filter()
    }

    if (document.body.contains($('.movie'))) {
        getMovie(movieDetail)
    }

    if (document.body.contains($('.actor'))) {
        getActor(actorDetailUrl)
    }

    if (document.body.contains($('.search-details'))) {
        search()
    }

    if(document.body.contains($('.favorite-movies'))) {
        wishlist()
    }

    window.addEventListener('resize', function () {
        wrapperDistance()
    })

    wrapperDistance()
    header()
})

function wrapperDistance() {
    let distance = $('.wrapper').offsetLeft

    $$('.wrapper-left').forEach(function (item) {
        item.style.paddingLeft = `${distance}px`
    })
    $$('.wrapper-left').forEach(function (item) {
        item.style.paddingRight = `${distance}px`
    })
}

function header() {
    window.addEventListener('scroll', function () {
        if(window.pageYOffset > 20) {
            $('.header').classList.add('header--active')
        } else {
            $('.header').classList.remove('header--active')
        }
    })

    $('.header__search img').addEventListener('click', function () {
        $('.header__search').classList.toggle('header__search--active')
    })

    $('.header__mobile').addEventListener('click', function () {
        this.classList.toggle('header__mobile--active')
        $('.header__menu').classList.toggle('header__menu--active')
    })
}