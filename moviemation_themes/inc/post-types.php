<?php
/**
 * Declare all used post types
 */
function ks_register_post_types(){

    $def_posttype_args = array(

        'labels'             => array(),
        'description'        => '',
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => '',
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 4,
        'supports'           => array('title', 'thumbnail', 'editor', 'author', 'excerpt', 'page-attributes' ),
        'show_in_rest'		 => true

    );

    $def_taxonomy_args = array(
        'hierarchical'      => true,
        'labels'            => array(),
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => '',
        'show_in_rest'		 => true,
        'show_in_quick_edit' => true,
    );

    $posttypes = array(

        'movie' => array(
            'labels' => array(
                'name'               => __('Movie'),
                'singular_name'      => __('Movie'),
                'menu_name'          => __('Movie'),
                'name_admin_bar'     => __('Movie'),
                'add_new'            => __('New Movie'),
                'add_new_item'       => __('New Movie'),
                'new_item'           => __('New Movie'),
                'edit_item'          => __('Edit Movie'),
                'view_item'          => __('See Movie'),
                'all_items'          => __('Movie'),
                'search_items'       => __('Search Movie'),
                'parent_item_colon'  => __('Movie parent:'),
                'not_found'          => __('Movie not found.'),
                'not_found_in_trash' => __('Movie not found in trash.')
            ),
            'menu_icon' => 'dashicons-video-alt',
            'description' => __('Movie'),
            'rest_base' =>'custom/movie',
            'has_archive' => 'biblioteca/Movie',
            'rewrite'     => [
                'slug' => 'movies/movie',
            ],
            'supports'    => array('title', 'thumbnail'),
            'show_in_rest' => false,  // @info inherited from old version
        ),
        
        'actor' => array(
            'labels' => array(
                'name'               => __('Actor'),
                'singular_name'      => __('Actor'),
                'menu_name'          => __('Actor'),
                'name_admin_bar'     => __('Actor'),
                'add_new'            => __('New Actor'),
                'add_new_item'       => __('New Actor'),
                'new_item'           => __('New Actor'),
                'edit_item'          => __('Edit Actor'),
                'view_item'          => __('See Actor'),
                'all_items'          => __('Actor'),
                'search_items'       => __('Search Actor'),
                'parent_item_colon'  => __('Actor parent:'),
                'not_found'          => __('Actor not found.'),
                'not_found_in_trash' => __('Actor not found in trash.')
            ),
            'menu_icon' => 'dashicons-admin-users',
            'description' => __('Actor'),
            'rest_base' =>'custom/actor',
            'has_archive' => 'biblioteca/Actor',
            'rewrite'     => [
                'slug' => 'actors/actor',
            ],
            'supports'    => array('title', 'thumbnail'),
            'show_in_rest' => false,  // @info inherited from old version
        ),
    );

    foreach ($posttypes as $posttype => $options) {

        $args = array_merge($def_posttype_args, $options);

        if(isset($args['taxonomy'])){

            $taxonomies = $args['taxonomy'];

            foreach($taxonomies as $taxonomy => $taxonomy_args){

                $taxonomy_args = array_merge($def_taxonomy_args, $taxonomy_args);

                register_taxonomy($taxonomy, array($posttype), $taxonomy_args);

            }

            unset($args['taxonomy']);

        }

        register_post_type($posttype, $args);

    }

}

add_action('init', 'ks_register_post_types', 10 );

/**
 * Change Native Posts labels
 */
function ks_change_post_label() {

    global $menu;
	global $submenu;

    $menu[5][0] = 'Not??cias';
    $submenu['edit.php'][5][0] = 'Not??cias';
    $submenu['edit.php'][10][0] = 'Adicionar Not??cia';

}

add_action( 'admin_menu', 'ks_change_post_label' );

function ks_change_post_object() {

	global $wp_post_types;

    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'Not??cias';
    $labels->singular_name = 'Not??cias';
	$labels->menu_name = 'Not??cias';
	$labels->name_admin_bar = 'Not??cias';
    $labels->add_new = 'Nova Not??cia';
    $labels->add_new_item = 'Nova Not??cia';
    $labels->new_item = 'Nova Not??cia';
    $labels->edit_item = 'Editar Not??cia';
    $labels->view_item = 'Ver Not??cia';
    $labels->all_items = 'Not??cias';
	$labels->search_items = 'Procurar Not??cias';
	$labels->parent_item_colon = 'Not??cias pai:';
    $labels->not_found = 'Nenhuma Not??cia encontrada';
	$labels->not_found_in_trash = 'Nenhuma Not??cia encontrada na lixeira';

}

add_action( 'init', 'ks_change_post_object' );
