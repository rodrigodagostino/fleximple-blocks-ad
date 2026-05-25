<?php

/**
 * Plugin Name:       Fleximple Blocks: Ad
 * Description:       Display an ad that can switch to different versions depending on the screen size.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Rodrigo D’Agostino
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       fleximple-blocks-ad
 *
 * @package FleximpleBlocksAd
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

define('FB_AD_ID', 'fleximple-blocks-ad');
define('FB_AD_VERSION', '1.0.0');
define('FB_AD_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FB_AD_PLUGIN_URL', plugin_dir_url(__FILE__));
define('FB_AD_PLUGIN_FILE', __FILE__);
define('FB_AD_PLUGIN_BASE', plugin_basename(__FILE__));

/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function fleximple_blocks_ad_block_init()
{
	load_plugin_textdomain('fleximple-blocks-ad', false, dirname(plugin_basename(__FILE__)) . '/languages/');

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if (function_exists('wp_register_block_types_from_metadata_collection')) {
		wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if (function_exists('wp_register_block_metadata_collection')) {
		wp_register_block_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach (array_keys($manifest_data) as $block_type) {
		register_block_type(__DIR__ . "/build/{$block_type}");
	}
}
add_action('init', 'fleximple_blocks_ad_block_init');

/**
 * Load the translation files.
 */
function fleximple_blocks_ad_set_script_translations()
{
	wp_set_script_translations('fleximple-blocks-ad-editor-script', 'fleximple-blocks-ad', plugin_dir_path(__FILE__) . 'languages');
}
add_action('init', 'fleximple_blocks_ad_set_script_translations');
