<!DOCTYPE html>
<html lang="pt-br">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<?php
	wp_head();

	global $current_user;
	wp_get_current_user();
	?>

	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

	<!-- Assets -->
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="theme-color" content="#ffffff">
	<!-- Gerador de Favicon -->
	<!-- https://realfavicongenerator.net/ -->

	<title><?php echo get_bloginfo('name'); ?></title>
</head>

<body <?php body_class($post->post_name ?? ''); ?>>
	<header class="wrapper header">
		<a href="/" title="MovieMation">
			<h1 class="header__logo">
				<?php echo get_the_title(); ?>
				<img width="355" height="142" src="<?php echo get_field('logo', 'options'); ?>" alt="MovieMation">
			</h1>
		</a>
		<nav class="header__menu">
			<?php
			$header_menu = wp_get_nav_menu_items("Menu Header");
			foreach ($header_menu as $key => $menu_item) {
				echo '<a title="' . str_replace('*', '', $menu_item->title) . '" href="' . $menu_item->url . '" class="header__item ' . (get_the_ID() == $menu_item->object_id ? 'is-current active' : '') . '" target="' . $menu_item->target . '">';
				$menu_title = $menu_item->title;

				if (strpos($menu_item->title, '*') !== false) {
					$menu_title = str_replace('*', '', $menu_item->title);
				}

				echo $menu_title;
				echo '</a>';
			}

			if (!is_user_logged_in()) {
			?>

				<hr>
				<div class="header__enter header__enter--login">
					<span>Login</span>
					<?php echo do_shortcode('[login_auth_form]'); ?>
				</div>
				<div class="header__enter header__enter--signup">
					<span>Sign Up</span>
					<?php echo do_shortcode('[register_auth_form]'); ?>
				</div>
			<?php

			}

			?>
			<div class="header__search">
				<?php echo get_search_form(); ?>
			</div>

		</nav>
		<span class="header__mobile">
			<span></span>
			<span></span>
			<span></span>
		</span>
	</header>
	<section class="banner">
		<figure><img src="<?php echo get_the_post_thumbnail_url(); ?>" alt=""></figure>
	</section>