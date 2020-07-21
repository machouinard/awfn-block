<?php

require_once AWFN_INC_PATH . 'class-awfn.php';

/**
 * Return data for Server Side Render component
 *
 * @param array  $atts    option values
 * @param string $content unused
 *
 * @return string
 * @since 1.0.0
 *
 */
function awfn_server_side( $atts, $content ) {

	$defaults = [
		'icao'           => 'KSAC',
		'showMetar'      => true,
		'showTaf'        => true,
		'showPireps'     => true,
		'radialDist'     => 100,
		'hoursBeforeNow' => 2,
		'editing'        => true,
	];
	$options  = wp_parse_args( $atts, $defaults );

	$icao           = strtoupper( esc_attr( $options['icao'] ) );
	$showMetar      = (bool) $options['showMetar'];
	$showTaf        = (bool) $options['showTaf'];
	$showPireps     = (bool) $options['showPireps'];
	$radialDist     = (int) $options['radialDist'];
	$hoursBeforeNow = (int) $options['hoursBeforeNow'];
	$editing        = (bool) $options['editing'];

	$metar  = $showMetar ? '[show metar]' : '';
	$taf    = $showTaf ? '[show taf]' : '';
	$pireps = $showPireps ? '[show pireps]' : '';

	if ( $editing ) {
		return "<p>$icao $metar $taf $pireps $radialDist miles $hoursBeforeNow hours</p>";
	} else {
		$awfn  = new \AWFN\Weather( $options );
		$metar = $awfn->getMetar();
		$x     = 5;

		return "<p class='coded-metar'>{$metar}</p>";
	}

}


