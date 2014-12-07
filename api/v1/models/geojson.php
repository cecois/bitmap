<?php
/*
 *  GEOJSON
*/
function pg2GEOJSON($pgresults, $fieldsToOutput, $sql) {
    // Return as GeoJSON
    $geojson = array(
        'type' => 'FeatureCollection',
        'features' => array()
    );
    if (isset($params['callback'])) {
        $callback = $params['callback'];
    }
    
    while ($row = pg_fetch_array($pgresults)) {
        $rowcount = count($row);
        $feature = array(
            'type' => 'Feature',
            'geometry' => json_decode($row['the_geom']) ,
            'crs' => array(
                'type' => 'EPSG',
                'properties' => array(
                    'code' => '4326'
                )
            ) ,
            'properties' => array(
                // 'id' => $row['id'],
                // 'location'=>$row['location']
                
            )
        );

        if (isset($row['title'])) {
            $feature['properties']['title'] = $row['title'];
        }
        if (isset($row['id'])) {
            $feature['properties']['id'] = $row['id'];
        }
        if (isset($row['gid'])) {
            $feature['properties']['id'] = $row['gid'];
        }
        if (isset($row['location'])) {
            $feature['properties']['location'] = $row['location'];
        }
        if (isset($row['grouping'])) {
            $feature['properties']['grouping'] = $row['grouping'];
        }


        array_push($geojson['features'], $feature);
    }
    header('Content-type: application/json', true);
    if (isset($callback)) {
        echo $callback . '(' . json_encode($geojson) . ')';
    } else {
        
        return json_encode($geojson);
    }
}
