<?php

return [
	// in production, tokens should be passed from environment variables
    'security_token' => getenv('security_token') ? getenv('security_token') : '25sGpNdUqRZUB6nhODxGs8RIJ',
    'maps_token' => getenv('maps_token') ? getenv('maps_token') : 'AIzaSyDu22cYt-k6mP-W1RiDzdc3tp-ujKKMHk0',
];
