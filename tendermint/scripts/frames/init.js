
"use strict";
/*jslint browser: true, nomen: true*/
/*global define*/

define(["./title", "./intro", "./overview", "./conclusion"],
    function (title, intro, overview, conclusion) {
        return function (player) {
            player.frame("home", "Home", title);
            player.frame("intro", "What is BFT Distributed Consensus?", intro);
            player.frame("overview", "Protocol Overview", overview);
            player.frame("conclusion", "Other Resources", conclusion);
        };
    });
