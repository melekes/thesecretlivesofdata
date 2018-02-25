
"use strict";
/*jslint browser: true, nomen: true*/
/*global define*/

define(["../model/log_entry"], function (LogEntry) {
    return function (frame) {
        var player = frame.player(),
            layout = frame.layout(),
            model = function() { return frame.model(); },
            client = function(id) { return frame.model().clients.find(id); },
            node = function(id) { return frame.model().nodes.find(id); },
            wait = function() { var self = this; model().controls.show(function() { player.play(); self.stop(); }); };

        frame.after(1, function() {
            model().nodeLabelVisible = false;
            model().clear();
            model().nodes.create("a");
            model().nodes.create("b");
            model().nodes.create("c");
            layout.invalidate();
        })

        .after(800, function () {
            model().subtitle = '<h2><em>Tendermint</em> is a protocol for implementing BFT distributed consensus.</h2>'
                           + model().controls.html();
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(100, function () {
            frame.snapshot();
            model().subtitle = '<h2>Let\'s look at a high level overview of how it works.</h2>'
                           + model().controls.html();
            layout.invalidate();
        })
        .after(100, wait).indefinite()


        .after(100, function () {
            frame.snapshot();
            model().zoom([node("b")]);
            model().subtitle = '<h2>A node can be in 1 of 2 states:</h2>'
                           + model().controls.html();
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(100, function () {
            frame.snapshot();
            node("b")._state = "validator";
            model().subtitle = '<h2>The <em>Validator</em> state,</h2>'
                           + model().controls.html();
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(100, function () {
            frame.snapshot();
            node("b")._state = "proposer";
            model().subtitle = '<h2>the <em>Proposer</em> state,</h2>'
                           + model().controls.html();
            layout.invalidate();
        })
        .after(100, wait).indefinite()

        .after(300, function () {
            frame.snapshot();
            model().zoom(null);
            node("a")._state = "proposer";
            node("b")._state = "validator";
            model().subtitle = '<h2>At the beginning of every epoch, proposer is chosen by a deterministic and non-choking round robin selection algorithm.</h2>'
                           + model().controls.html();
            layout.invalidate();
        })
        .after(100, wait).indefinite()

        .after(100, function () {
            frame.snapshot();
            model().subtitle = '<h2>Proposer gets to propose a block (batch of transactions).</h2>'
                           + model().controls.html();
            layout.invalidate();
        })
        .after(100, function () {
            model().send(node("a"), node("b"), {type:"RVREQ"})
            model().send(node("a"), node("c"), {type:"RVREQ"})
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(100, function () {
            frame.snapshot();
            model().subtitle = '<h2>Nodes will send their prevote to other nodes.</h2>'
                           + model().controls.html();
            layout.invalidate();
        })
        .after(300, function () {
            model().send(node("b"), node("a"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            model().send(node("c"), node("a"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(300, function () {
            model().send(node("a"), node("b"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            model().send(node("c"), node("b"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(300, function () {
            model().send(node("a"), node("c"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            model().send(node("b"), node("c"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(100, function () {
            frame.snapshot();
            model().subtitle = '<h2>Once 2/3 prevotes received by every node, proposal is considered accepted (precommited).</h2>'
                           + model().controls.html();
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(100, function () {
            frame.snapshot();
            model().subtitle = '<h2>Then nodes wait for precommits from 2/3 of all validators for this proposal.</h2>'
                          + model().controls.html();
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(300, function () {
            model().send(node("b"), node("a"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            model().send(node("c"), node("a"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(300, function () {
            model().send(node("a"), node("b"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            model().send(node("c"), node("b"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(300, function () {
            model().send(node("a"), node("c"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            model().send(node("b"), node("c"), {type:"RVRSP"}, function () {
                layout.invalidate();
            })
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(100, function () {
            frame.snapshot();
            model().subtitle = '<h2>Once received, proposal is commited.</h2>'
                          + model().controls.html();
            layout.invalidate();
        })
        .after(100, wait).indefinite()
        .after(100, function () {
            frame.snapshot();
            model().subtitle = '<h2>The cluster has now come to consensus about the system state.</h2>'
                          + model().controls.html();
            layout.invalidate();
        })
        .after(100, wait).indefinite()


        // .after(100, function () {
        //     frame.snapshot();
        //     model().subtitle = '<h2>All changes to the system now go through the proposer.</h2>'
        //                    + model().controls.html();
        //     layout.invalidate();
        // })
        // .after(100, wait).indefinite()
        // .after(100, function () {
        //     frame.snapshot();
        //     model().subtitle += " ";
        //     model().clients.create("x");
        //     layout.invalidate();
        // })
        // .after(1000, function () {
        //     client("x")._value = "5";
        //     layout.invalidate();
        // })
        // .after(500, function () {
        //     model().send(client("x"), node("a"), null, function () {
        //         node("a")._log.push(new LogEntry(model(), 1, 1, "SET 5"));
        //         layout.invalidate();
        //     });
        //     layout.invalidate();
        // })
        // .after(100, wait).indefinite()
        // .after(100, function () {
        //     frame.snapshot();
        //     model().subtitle = '<h2>Each change is added as an entry in the node\'s mempool.</h2>'
        //                    + model().controls.html();
        //     layout.invalidate();
        // })
        // .after(100, wait).indefinite()
        // .after(100, function () {
        //     frame.snapshot();
        //     model().subtitle = '<h2>This log entry is currently uncommitted so it won\'t update the node\'s value.</h2>'
        //                    + model().controls.html();
        //     layout.invalidate();
        // })
        // .after(100, wait).indefinite()
        // .after(300, function () {
        //     frame.snapshot();
        //     model().send(node("a"), node("b"), {type:"AEREQ"}, function () {
        //         node("b")._log.push(new LogEntry(model(), 1, 1, "SET 5"));
        //         layout.invalidate();
        //     });
        //     model().send(node("a"), node("c"), {type:"AEREQ"}, function () {
        //         node("c")._log.push(new LogEntry(model(), 1, 1, "SET 5"));
        //         layout.invalidate();
        //     });
        //     model().subtitle = '<h2>To commit the entry the node first replicates it to the follower nodes...</h2>'
        //                    + model().controls.html();
        //     layout.invalidate();
        // })
        // .after(100, wait).indefinite()
        // .after(100, function () {
        //     frame.snapshot();
        //     model().send(node("b"), node("a"), {type:"AEREQ"}, function () {
        //         node("a")._commitIndex = 1;
        //         node("a")._value = "5";
        //         layout.invalidate();
        //     });
        //     model().send(node("c"), node("a"), {type:"AEREQ"});
        //     model().subtitle = '<h2>then the proposer waits until a majority of nodes have written the entry.</h2>'
        //                    + model().controls.html();
        //     layout.invalidate();
        // })
        // .after(1000, function () {
        //     node("a")._commitIndex = 1;
        //     node("a")._value = "5";
        //     layout.invalidate();
        // })
        // .after(100, wait).indefinite()
        // .after(100, function () {
        //     frame.snapshot();
        //     model().subtitle = '<h2>The entry is now committed on the proposer node and the node state is "5".</h2>'
        //                    + model().controls.html();
        //     layout.invalidate();
        // })
        // .after(100, wait).indefinite()
        // .after(100, function () {
        //     frame.snapshot();
        //     model().send(node("a"), node("b"), {type:"AEREQ"}, function () {
        //         node("b")._value = "5";
        //         node("b")._commitIndex = 1;
        //         layout.invalidate();
        //     });
        //     model().send(node("a"), node("c"), {type:"AEREQ"}, function () {
        //         node("c")._value = "5";
        //         node("c")._commitIndex = 1;
        //         layout.invalidate();
        //     });
        //     model().subtitle = '<h2>The proposer then notifies the followers that the entry is committed.</h2>'
        //                    + model().controls.html();
        //     layout.invalidate();
        // })
        // .after(100, wait).indefinite()
        // .after(100, function () {
        //     frame.snapshot();
        //     model().subtitle = '<h2>The cluster has now come to consensus about the system state.</h2>'
        //                    + model().controls.html();
        //     layout.invalidate();
        // })
        // .after(100, wait).indefinite()


        // .after(300, function () {
        //     frame.snapshot();
        //     model().subtitle = '<h2>This process is called <em>Log Replication</em>.</h2>'
        //                    + model().controls.html();
        //     layout.invalidate();
        // })
        // .after(100, wait).indefinite()


        .after(300, function () {
            frame.snapshot();
            player.next();
        })


        player.play();
    };
});
