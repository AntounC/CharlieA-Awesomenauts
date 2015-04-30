    <?php
    require_once(__DIR__ . "/../model/config.php");
    require_once(__DIR__ . "/../controller/login-verify.php");
    /*links config.php and login-verify.php with logout-user.php*/
    if(!authenticateUser()) {
        header("location: " . $path . "index.php");
        die();
        /*if user is authenticated, than the page is taken to index.php*/
    }
    
    unset($_SESSION["authenticated"]);
    
    session_destroy();
    header("location: " . $path . "index.php");
    /*destroys session and redirects to index.php*/