
(function() {

    var database = firebase.database();

    var products = [];

    function createUserElement(username) {
        $('#users').append('<button class="user">' + username + '</button>');
    }

    function drawUsers(users) {
        $('#users > button').remove();
        for(const key of Object.keys(users)) {
            createUserElement(users[key].name);
        };
    }

    database.ref('/users/').once('value').then(function(snapshot) {
        const users = snapshot.val();
        drawUsers(users);
    });

    database.ref('/users/').on('value', function(snapshot) {
       drawUsers(snapshot.val());
    });

    function createUser(username) {
        var id = Math.floor(Math.random() * (100000 + 1));
        database.ref('/users/' + id).set({
            name: username
        });
    }

    $(".addUser").click(function() {
        createUser($("#newUser").val());
    });

    function redrawInfo() {
        $("#products")[0].innerText = products.reduce(function(text, product) {
            return text + product.name + ", ";
        }, "");

        $("#price")[0].innerText = products.reduce(function(sum, product) {
            return sum + product.value;
        }, 0);
    }

    $(".item").click(function() {
        products.push({name: $(this)[0].innerText, value: parseFloat($(this)[0].value)});
        redrawInfo();
    });

    $(".undo").click(function() {
       products.pop();
       redrawInfo();
    });

    $(".back").click(function() {
       products = [];
        $("#products")[0].innerText = "";
        $("#price")[0].innerText = "0";
    });

}());
