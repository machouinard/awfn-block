<?php

/**
 * Return data for Server Side Render component
 *
 * @param array $atts option values
 * @param string $content  unused
 *
 * @return string
 * @since 1.0.0
 *
 */
function awfn_server_side( $atts, $content ) {

	$defaults = [
		'icao'       => 'KSAC',
		'showMetar'  => true,
		'showTaf'    => true,
		'showPireps' => true,
		'radialDist' => 100
	];
	$options = wp_parse_args( $atts, $defaults );

	$icao       = strtoupper( esc_attr( $options['icao'] ) );
	$showMetar  = (bool)$options['showMetar'];
	$showTaf    = (bool)$options['showTaf'];
	$showPireps = (bool)$options['showPireps'];
	$radialDist = (int)$options['radialDist'];

	$metar  = $showMetar ? 'metar' : '';
	$taf    = $showTaf ? 'taf' : '';
	$pireps = $showPireps ? 'pireps' : '';

	return "<p>$icao $metar $taf $pireps $radialDist</p>";
}
