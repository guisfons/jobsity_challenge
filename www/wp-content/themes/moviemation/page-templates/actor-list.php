<?php

/**
 * Template Name: Actor List
 * Template Post Type: page
 *
 * @package UAU
 * @since 1.0.0
 */

get_header();
?>
<main class="actor-list">
    <section class="actor-list__filter">
        <form class="wrapper" action="">
            <input type="text" name="name" id="name" placeholder="Actor name">
            <input type="text" name="title" id="title" placeholder="Movie title">
        </form>
    </section>
    <section class="actor-list__list">
        <h2>Popular Actors</h2>
    </section>
</main>
<?php

get_footer();
