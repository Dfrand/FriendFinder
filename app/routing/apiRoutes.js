var friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    app.post("/api/friends", function (req, res) {
        var bestFriend = {
            name:"",
            photo:"",
            friendDif: Infinity
        };
        

        var userData = req.body;
        var userScore = userData.scores;
        var totalDif;

        for(var i=0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDif = 0;
            console.log(currentFriend.name);

            for(var j=0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScore[j];

                totalDif += Math.abs(parseInt(currentUserScore)-
                 parseInt(currentFriendScore));
                
            }
            if (totalDif <= bestFriend.friendDif) {
                bestFriend.name = currentFriend.name;
                bestFriend.photo = currentFriend.photo;
                bestFriend.friendDif = totalDif;
            }
        }
        friends.push(userData)
        res.json(bestFriend);
    });

}