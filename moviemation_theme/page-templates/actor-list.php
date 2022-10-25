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
    <section class="wrapper actor-list__list">
    </section>
    <div class="lds-roller-container">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
</main>
<?php

get_footer();
