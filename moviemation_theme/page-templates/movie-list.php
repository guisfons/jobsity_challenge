<?php

/**
 * Template Name: Movie List
 * Template Post Type: page
 *
 * @package UAU
 * @since 1.0.0
 */

get_header();
?>
<main class="movie-list">
    <section class="movie-list__filter">
        <form class="wrapper" action="">
            <input type="text" name="title" id="title" placeholder="Movie title">
            <input type="text" name="year" id="year" placeholder="Year">
            <select name="genre" id="genre">
                <option value="" selected>Genre</option>
            </select>
        </form>
    </section>
    <section class="wrapper movie-list__list">
        
        <!-- <span class="movie-list__more">Load more</span> -->
    </section>

    <!-- <div class="movie-list__pagination">
        <div class="page" id="prev">Previous Page</div>
        <div class="current" id="current">1</div>
        <div class="page" id="next">Next Page</div>
    </div> -->
</main>
<?php

get_footer();
