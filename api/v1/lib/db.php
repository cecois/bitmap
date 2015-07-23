<?php

try {
        // $db = new PDO("pgsql:dbname=$pg_db_name;host=$pg_db_host", "$pg_db_user", "$pg_db_pssw" );

        $connection_string = "host=$pg_db_host dbname=$pg_db_name user=$pg_db_user password=$pg_db_pssw";
      $db = pg_connect($connection_string);

    }
catch(PDOException $e)
    {
    echo $e->getMessage();
    }
?>
