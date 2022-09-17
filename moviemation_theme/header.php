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
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

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
			<a href="/">Home</a>
			<a href="/movies/">Movies List</a>
			<a href="/actors/">Actor List</a>
		</nav>
		<span class="header__mobile">
			<span></span>
			<span></span>
			<span></span>
		</span>
	</header>
	<!-- <section class="banner">
		<figure><img src="<?php echo get_the_post_thumbnail_url( get_the_ID(), 'medium' ); ?>" alt=""></figure>
	</section> -->