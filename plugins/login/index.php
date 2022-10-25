<?php
/*
Plugin Name: Register, Login and WishList
Description: User Register/Login and Wishlist plugin
Version: 1.0.0
Author: Guilherme Silva Fonseca
*/

if (!function_exists('add_action')) {
    echo "The plugin cannot be accessed directly";
    exit;
}

// Plugin activation
function gl_plugin_activation()
{
    if (version_compare(get_bloginfo('version'), '5.8', '<')) {
        wp_die('You need to update your Wordpress version.');
    }
}

register_activation_hook(__FILE__, 'gl_plugin_activation');

// Load CSS and JS

function load_js_css()
{
    wp_enqueue_script('js', plugins_url('/script.js', __FILE__, $in_footer = true));

    // Transfer php data to js
    wp_localize_script('js', 'login_obj', array(
        'ajax_url' => admin_url('admin-ajax.php')
    ));

    wp_localize_script('js', 'register_obj', array(
        'ajax_url' => admin_url('admin-ajax.php')
    ));

    wp_localize_script('js', 'wishlist_obj', array(
        'ajax_url' => admin_url('admin-ajax.php')
    ));
}

add_action('wp_enqueue_scripts', 'load_js_css');

// Creating login shortcode

function gl_login_auth_form_shortcode()
{
    $formHTML = file_get_contents(plugins_url('login/template_login.php'));
    echo $formHTML;
}

add_shortcode('login_auth_form', 'gl_login_auth_form_shortcode');

function login()
{
    $array = array('status' => 1);

    if (empty($_POST['username']) || empty($_POST['password'])) {
        wp_send_json($array);
    }

    $username = sanitize_user($_POST['username']);

    if (!username_exists($username)) {
        wp_send_json($array);
    }

    $userdata = get_user_by('login', $username);

    $password = sanitize_text_field($_POST['password']);

    $user = wp_signon(array(
        'user_login' => $userdata->user_login,
        'user_password' => $password,
        'remember' => true
    ));

    if (is_wp_error($user)) {
        wp_send_json($array);
    }

    $array['status'] = 2;

    wp_send_json($array);
}

add_action('wp_ajax_nopriv_login', 'login');

function gl_register_auth_form_shortcode()
{
    $formHTML = file_get_contents(plugins_url('login/template_register.php'));
    echo $formHTML;
}

add_shortcode('register_auth_form', 'gl_register_auth_form_shortcode');

function register()
{
    $array = array('status' => 1);

    if (empty($_POST['registerUsername']) || empty($_POST['registerPassword'])) {
        wp_send_json($array);
    }

    $username = sanitize_user($_POST['registerUsername']);
    $password = sanitize_text_field($_POST['registerPassword']);
    $token = sanitize_text_field($_POST['token']);

    $userdata = array(
        'user_login' => $username,
        'user_pass' => $password,
        'ext_phone' => $token,
        'role' => 'contributor'
    );

    wp_insert_user(wp_slash($userdata));

    $array['status'] = 2;

    wp_send_json($array);
}

add_action('wp_ajax_nopriv_register', 'register');

// New field
add_filter('user_contactmethods', 'custom_user_token');
function custom_user_token($token)
{
    $token['ext_phone'] = 'Token';
    return $token;
}

add_action('wp_ajax_addtowishlist', 'addtowishlist');
function addtowishlist()
{
    $array = array('status' => 1, 'favorite' => 1);

    $movieId = sanitize_text_field($_POST['movieId']);

    $user_id = get_current_user_id();

    $wishlist = get_user_meta($user_id, 'wishlist', true);


    if (empty($wishlist)) {
        $wishlist = array();
    }
    if (!in_array($movieId, $wishlist)) {
        $wishlist = array_values(array_unique(array_merge($wishlist, [$movieId])));
        $array['favorite'] = 2;
    } else {
        $wishlist = array_values(array_diff($wishlist, array($movieId)));
        $array['favorite'] = 1;
    }
    
    if(is_user_logged_in()){
        $result = update_user_meta($user_id, 'wishlist', $wishlist);
    }

    $array['status'] = 2;

    if($result){
        wp_send_json($array, ['success' => true, "wishlist" => $wishlist]);
    }else{
        wp_send_json($array, ['success' => false, "wishlist" => $wishlist], 400);
    }
}
