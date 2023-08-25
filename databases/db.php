<?php

include "../define.php";
    if (isset($_POST["language"])) {
        phpinfo();

        $selectedLanguage = $_POST["language"];

        $db_conn = pg_connect("host=localhost port=5432 dbname=postgres user=postgres password=" . PASSWORT);
        pg_insert($db_conn, "languages", [1,"German"], 0);
          
        // You can perform any necessary PHP logic here based on the selected language
        // For example, save the language to a database or perform other operations
            
        // Respond with a success status (HTTP 200)
        http_response_code(200);
    } else {
        // Respond with a bad request status (HTTP 400) if language parameter is missing
        http_response_code(400);
        echo "Bad request. Language parameter missing.";
    }
?>