<?php

function getGeometryColumn($schema, $table)
	{
		// Global database variable
		global $db;
		$sql = "select f_geometry_column as column from public.geometry_columns where f_table_schema = '".$schema."' AND f_table_name='".$table."';";

		// Try-catch block to catch any wayward exceptions
		try
		{	

			 // Execute SQL query
                $pgcolumnresult = pg_query($db, $sql);
                
                while ($row = pg_fetch_array($pgcolumnresult)) {
                    $column = $row['column'];
                    return $column;
                }

		}
		catch(Exception $e)
		{
			// Catch any exceptions and report the problem
			$result = array();
			$result['success'] = false;
			$result['errormsg'] = $e->getMessage();
			return $result['errormsg'];
		}
	}

?>