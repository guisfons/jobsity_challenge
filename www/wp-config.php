<?php
/**
 * As configurações básicas do WordPress
 *
 * O script de criação wp-config.php usa esse arquivo durante a instalação.
 * Você não precisa usar o site, você pode copiar este arquivo
 * para "wp-config.php" e preencher os valores.
 *
 * Este arquivo contém as seguintes configurações:
 *
 * * Configurações do MySQL
 * * Chaves secretas
 * * Prefixo do banco de dados
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

/**
 * Composer autoload
 */
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
	require_once (__DIR__ . '/vendor/autoload.php');
}

// ** Configurações do MySQL - Você pode pegar estas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define( 'DB_NAME', 'wp_moviemation' );

/** Usuário do banco de dados MySQL */
define( 'DB_USER', 'docker' );

/** Senha do banco de dados MySQL */
define( 'DB_PASSWORD', 'banana' );

/** Nome do host do MySQL */
define( 'DB_HOST', 'database' );

/** Charset do banco de dados a ser usado na criação das tabelas. */
define( 'DB_CHARSET', 'utf8mb4' );

/** O tipo de Collate do banco de dados. Não altere isso se tiver dúvidas. */
define( 'DB_COLLATE', 'utf8mb4_general_ci' );

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las
 * usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org
 * secret-key service}
 * Você pode alterá-las a qualquer momento para invalidar quaisquer
 * cookies existentes. Isto irá forçar todos os
 * usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
/**#@-*/
define('AUTH_KEY',         '4]JF+o$f`S{HN]nr+n.cLK:7z-T%-$|,.p~.d.WCJ;uLpgJ|{K7k%dl*>+e]B$]j');
define('SECURE_AUTH_KEY',  'J`qJ<<..Ws1Vd3>f1Xre%+!s`||IsM;$_bff,aY3.V}!PS).e%o=*&dW%!b |%}^');
define('LOGGED_IN_KEY',    '8.9M`.E?E1Z_dBAr{!.+=bo76+!U&:/M,kd0Gvox|>D[#`VB(S+dQ<WnE>1N<cxA');
define('NONCE_KEY',        '4ys8$sPqS[OaKFfc^fx9T>Xw>nN@bs$ |+;N+->?Y9Jse%{lUkpN8BCIv=j7cGn`');
define('AUTH_SALT',        'c`6{=A[|7t +,H#*`U>^C4@z)v`v=#$E(B vby|dS/[dc!>&Do`sx<>P~CL2J/o%');
define('SECURE_AUTH_SALT', '.efa/kuEoqk)ft&H5cb*M`d!0-PQ,^xd[kXha5%zO$vz6>Z2-1fU.]R/8?{,DV)h');
define('LOGGED_IN_SALT',   'Zt6x&Uf)yFw`%ZZ<}7r@pY,0Puf]asB;-iZNAY^M[mR=6ERnRV?HJM/CmAd5)UXc');
define('NONCE_SALT',       '8W-4`Hd:z(,0`eMX3e^)*9w FQbltvA~b|IDK%Te?7t$TP>>q[0(PG>3faLZ6*bu');

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der
 * um prefixo único para cada um. Somente números, letras e sublinhados!
 */
$table_prefix = 'wp_';

/**
 * Para desenvolvedores: Modo de debug do WordPress.
 *
 * Altere isto para true para ativar a exibição de avisos
 * durante o desenvolvimento. É altamente recomendável que os
 * desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 *
 * Para informações sobre outras constantes que podem ser utilizadas
 * para depuração, visite o Codex.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', true );


if($_SERVER['REQUEST_SCHEME'] === "https"){
	define('WP_HOME',       'https://localhost');
	define('WP_SITEURL',    'https://localhost');	
}else {
	define('WP_HOME',       'http://localhost');
	define('WP_SITEURL',    'http://localhost');
}

/**
 * Disable automatic updates and installations from production
 */
if (strpos(WP_HOME, 'localhost') === false) {
	define('automatic_updater_disabled', true );
	define('WP_AUTO_UPDATE_CORE', false );
	define('DISALLOW_FILE_MODS', true);
} else {
    define('FS_METHOD', 'direct');
	define( 'WP_ROCKET_EMAIL', 'marcelo@okn.com.br' );
	define( 'WP_ROCKET_KEY', '5c0bc1ab');
	define ('IMAGIFY_API_KEY', '8ca067290fb462ca54d42a58f7efaedcda85f579');
}


/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Configura as variáveis e arquivos do WordPress. */
require_once ABSPATH . 'wp-settings.php';
