// Initialize the map globally
let map;

// Function to initialize the map
function initMap() {
  // Initial coordinates (you can set your default location)
  const initialCoordinates = { lat: -34.397, lng: 150.644 };

  // Initialize the map centered at the initial coordinates
  map = new google.maps.Map(document.getElementById('map'), {
    center: initialCoordinates,
    zoom: 15 // You can adjust the initial zoom level
  });

  // Create a marker that can be moved to select a location
  const marker = new google.maps.Marker({
    position: initialCoordinates,
    map: map,
    draggable: true // Allow the marker to be dragged to select the location
  });

  // Event listener to update coordinates when marker position changes
  marker.addListener('dragend', function(event) {
    const newCoordinates = event.latLng.toJSON();
    console.log('New coordinates:', newCoordinates);
    // Store the coordinates or use them as needed
  });
}

// Function to initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
  initMap();
});

// Function to trigger pinning the location
function pinLocation() {
  // You can perform actions when the "Pin Location" button is clicked
  // For example, get the current coordinates and store them
  const currentCoordinates = map.getCenter().toJSON();
  console.log('Pinned coordinates:', currentCoordinates);
  // Store the coordinates or use them as needed
}