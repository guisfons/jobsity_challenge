<form role="search" action="/" method="get">
	<input type="text" name="s" id="search" placeholder="Search for movie or actor" value="<?php the_search_query(); ?>" />
    <input type="submit" value="Find">
	<img alt="Search" src="<?php echo get_template_directory_uri(); ?>/assets/img/search.png"/>
</form>