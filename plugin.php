<?php
/**
 * Plugin Name: AWFN Gutenberg Block Plugin
 * Plugin URI: https://github.com/machouinard
 * Description: Gutenberg test block for AWFN plugin
 * Author: machouinard
 * Author URI: https://chouinard.me/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package AWFN
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! defined( 'AWFN_INC_PATH' ) ) {
	define( 'AWFN_INC_PATH', plugin_dir_path( __FILE__ ) . 'inc/' );
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
