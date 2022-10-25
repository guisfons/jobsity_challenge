window.onload = () => {
    if (window.jQuery) {
        customToken()

        if(jQuery('.form-login').length) {
            jQuery('.form-login').on('submit', (e) => {
                e.preventDefault()
        
                jQuery('.form-login p').innerHTML = 'loading...';
        
                var form = {
                    action: 'login',
                    username: jQuery('#username').val(),
                    password: jQuery('#password').val(),
                }
    
                jQuery.ajax({
                    type: 'POST',
                    url: login_obj.ajax_url,
                    data: form,
                    success: function (json) {
                        if(json.status == 2 ) {
                            alert('Logged successfully!')
                            window.location.reload()
                        } else {
                            alert('Incorrect username or password.')
                        }
                    }
                })
            })
        }
    
        if(jQuery('.form-register').length) {
            jQuery('.form-register').on('submit', (e) => {
                e.preventDefault()

                jQuery('.form-register p').innerHTML = 'loading...';

                var form = {
                    action: 'register',
                    registerUsername: jQuery('#registerUsername').val(),
                    registerPassword: jQuery('#registerPassword').val(),
                    token: jQuery('#token').val(),
                }

                jQuery.ajax({
                    type: 'POST',
                    url: register_obj.ajax_url,
                    data: form,
                    success: function (json) {
                        if(json.status == 2 ) {
                            alert('Thanks for registering, now you can log in!')
                        } else {
                            alert('Register failed try again later.')
                        }
                    }
                })
            })
        }

        waitForElm('.movie-details__favorite').then(() => {
            jQuery('.movie-details__favorite').on('click', function() {
                if(jQuery('.logged-in').length) {
                    var form = {
                        action: 'addtowishlist',
                        movieId: window.location.search.substring(url.lastIndexOf('?id=') + 4),
                    }
    
                    jQuery.ajax({
                        type: 'POST',
                        url: wishlist_obj.ajax_url,
                        data: form,
                        success: function (json) {
                            if(json.status == 2 ) {
                                if(json.favorite == 1) {
                                    alert('Movie removed from favorites')
                                } else {
                                    alert('Movie added from favorites')
                                }
                            }
                        }
                    })
                } else {
                    alert('You must log in to save your favorite movies!')
                }
            })
        });
    }
}

function customToken() {
    jQuery.ajax({
        url: 'https://api.themoviedb.org/3/authentication/token/new?api_key=197192daa2a463199eec99eeded92000',
        context: document.body,
    }).done(function (data) {
        jQuery('#token').val(data.request_token)
    })
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}