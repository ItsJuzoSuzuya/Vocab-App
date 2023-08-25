function saveLanguageToDB(language) {
    // Send AJAX request to process_language.php
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "databases/db.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                history.back();
            }
        }
    };
    
    // Send language as POST parameter
    var data = "language=" + encodeURIComponent(language);
    xhr.send(data);
}