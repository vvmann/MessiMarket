
(function() {

    var database = firebase.database();

    var products = [];

    function createButtonElement(text, containerId, className = "button", value) {
        $('#' + containerId).append(`<button class="${className}" value="${value}">${text}</button>`);
    }

    function drawButtonCollection(collection, containerId, className) {
        for(const key of Object.keys(collection)) {
            createButtonElement(collection[key].name, containerId, className, collection[key].memberprice);
        };
    }

    function createUser(username) {
        var id = Math.floor(Math.random() * (100000 + 1));
        database.ref('/users/' + id).set({
            name: username
        });
    }

    $(".addUser").click(function() {
        createUser($("#newUser").val());
    });

    database.ref('/users/').on('value', function(snapshot) {
        $('#users > button').remove();
        drawButtonCollection(snapshot.val(), "users", "user");
    });

    database.ref('/products/').once('value').then( function(snapshot) {
        drawButtonCollection(snapshot.val(), "itemListing", "item");
    });

    function redrawInfo() {
        $("#products")[0].innerText = products.reduce(function(text, product) {
            return text + product.name + ", ";
        }, "");

        $("#price")[0].innerText = products.reduce(function(sum, product) {
            return sum + product.value;
        }, 0);
    }

    $("#itemListing").on('click', '.item', function() {
        products.push({name: $(this)[0].innerText, value: parseFloat($(this)[0].value)});
        redrawInfo();
    });

    $(".undo").on('click', function() {
       products.pop();
       redrawInfo();
    });

    $(".back").click(function() {
       products = [];
        $("#products")[0].innerText = "";
        $("#price")[0].innerText = "0";
    });

}());
