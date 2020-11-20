let marker = null;
export function mapSetMarker(lnglat, map) {
    if (marker) {
        map.remove(marker)
        marker = null;
    }
    marker = new AMap.Marker({
        position: [lnglat.lng, lnglat.lat]
    })
    map.add(marker)
}