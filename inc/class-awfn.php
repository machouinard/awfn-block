<?php
/**
 * Description
 *
 * https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=KDET&hoursBeforeNow=3
 *
 * @package     GB
 * @since       0.1.0
 * @author      machouinard
 */

namespace AWFN;

class Weather {

	protected $icao = false;
	protected $showMetar;
	protected $showTaf;
	protected $showPireps;
	protected $radialDist;
	protected $hoursBeforeNow;
	protected $baseUrl = 'https://www.aviationweather.gov/adds/dataserver_current/httpparam?requestType=retrieve&format=xml';
	protected $mostRecent = 'true';
	protected $hash;
	protected $body;
	protected $metar;

	public function __construct( $data ) {

		$defaults = [
			'icao'           => 'KDET',
			'showMetar'      => true,
			'showTaf'        => true,
			'showPireps'     => true,
			'radialDist'     => 100,
			'hoursBeforeNow' => 2,
		];
		$args     = wp_parse_args( $data, $defaults );

		$this->hash = md5( serialize( $args ) );

		$this->icao       = esc_attr( $args['icao'] );
		$this->showMetar  = (bool)$args['showMetar'];
		$this->showTaf    = (bool)$args['showTaf'];
		$this->showPireps = (bool)$args['showPireps'];
		$this->radialDist = (int)$args['radialDist'];
		$this->hoursBeforeNow = (int)$args['hoursBeforeNow'];

	}

	public function getMetar() {

		if ( ! $this->icao ) {
			return;
		}

		if ( ! $body = get_transient( $this->hash ) ) {

			$url = $this->baseUrl . '&dataSource=metars&mostRecent=' . $this->mostRecent . '&stationString=' . $this->icao . '&hoursBeforeNow=' . $this->hoursBeforeNow;

			// {@see https://codex.wordpress.org/HTTP_API}
			$response = wp_remote_get( $url );

			if ( ! is_wp_error( $response ) ) {
				if ( 200 == wp_remote_retrieve_response_code( $response ) ) {
					$body = wp_remote_retrieve_body( $response );
					set_transient( $this->hash, $body, 300 );
				} else {
					$error_message = wp_remote_retrieve_response_message( $response );
				}
			} else {
				// There was an error making the request
				$error_message = $response->get_error_message();
			}
		}

		$xml = simplexml_load_string( $body );

		$this->metar = $xml->data->METAR;
		$x = 5;
		return $this->metar->raw_text;

	}

}
