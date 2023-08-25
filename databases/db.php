<?php

include "../define.php";
$db = new mysqli( HOST, USER, PASSWORT, DB_NAME,PORT);
    if (isset($_POST["language"])) {
        $selectedLanguage = $_POST["language"];
        $sql = "INSERT INTO languages(language) 
            SELECT '$selectedLanguage' WHERE NOT EXISTS(SELECT * FROM languages WHERE language='$selectedLanguage')";

        $db->query($sql);

        // You can perform any necessary PHP logic here based on the selected language
        // For example, save the language to a database or perform other operations
            
        // Respond with a success status (HTTP 200)
        http_response_code(200);
    } else {
        // Respond with a bad request status (HTTP 400) if language parameter is missing
        http_response_code(400);
        echo "Bad request. Language parameter";
    }