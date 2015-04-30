<?php
require_once(__DIR__ . "/../model/config.php");
/*links config.php with login-verify*/

function authenticateUser() {
    if(!isset($_SESSION["authenticated"])) {
        return false;
        /*if isset is authenticed, than return is false*/
    }
    else {
        if($_SESSION["authenticated"] != true) {
            return false;
            /*if isset is not authenticed than this else happens. return is once again false*/
        }
        else {
            return true;
        }
    }
}
