<?php
/**
 * Plugin Name: Foglie Bio Plus — Anteprima bilingue
 * Description: Serves the IT/EN sandbox preview at /foglie-bio-plus/ while preserving La Ruota Bio's homepage.
 * Version: 1.0.2
 * Requires PHP: 7.4
 * Author: La Ruota Bio
 */

defined('ABSPATH') || exit;

// Route only the eight storefront documents. Existing posts, admin, REST and
// other WordPress pages remain under their current theme and plugins.
add_action('template_redirect', function () {
    if (is_admin() || is_feed() || is_trackback()) {
        return;
    }
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if (!in_array($method, array('GET', 'HEAD'), true)) {
        return;
    }
    foreach (array('p', 'page_id', 'name', 'pagename', 's', 'feed', 'preview', 'rest_route') as $query) {
        if (isset($_GET[$query])) {
            return;
        }
    }
    $path = wp_parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    $routes = array(
        '/foglie-bio-plus' => 'index.html',
        '/foglie-bio-plus/en' => 'en/index.html',
        '/foglie-bio-plus/privacy.html' => 'privacy.html',
        '/foglie-bio-plus/terms.html' => 'terms.html',
        '/foglie-bio-plus/cookies.html' => 'cookies.html',
        '/foglie-bio-plus/en/privacy.html' => 'en/privacy.html',
        '/foglie-bio-plus/en/terms.html' => 'en/terms.html',
        '/foglie-bio-plus/en/cookies.html' => 'en/cookies.html',
    );
    $route = rtrim((string) $path, '/') ?: '/';
    if (!isset($routes[$route])) {
        return;
    }
    $file = __DIR__ . '/site/' . $routes[$route];
    if (!is_readable($file)) {
        return; // A missing bundle leaves the original site available.
    }
    status_header(200);
    nocache_headers();
    header('Content-Type: text/html; charset=UTF-8');
    header('X-Robots-Tag: noindex, nofollow');
    header('X-Foglie-Preview: 1.0.2');
    if ($method !== 'HEAD') {
        readfile($file);
    }
    exit;
}, 0);
