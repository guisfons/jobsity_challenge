<?php

/**
 * Template Name: Favorites
 * Template Post Type: page
 *
 * @package UAU
 * @since 1.0.0
 */

get_header();
?>
<main class="favorite">
    <?php
        $user_id = get_current_user_id();
        $wishlist = get_user_meta($user_id, 'wishlist', true);
        
        foreach ($wishlist as $id) {
            echo '<input type="hidden" class="favorite-movie-ids" name="movieIds[]" value="'.$id.'"/>';
        }
    ?>
    <section class="wrapper favorite-movies">
    </section>
    <div class="lds-roller-container">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
</main>
<?php

get_footer();
