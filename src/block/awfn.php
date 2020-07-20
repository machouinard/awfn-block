<?php

function awfn_server_side( $atts, $content ) {

	$icao = isset( $atts['icao'] ) ? strtoupper( esc_attr( $atts['icao'] ) ) : '';

	return "<h2>{$icao}</h2>";
}
