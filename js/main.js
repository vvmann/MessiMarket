
(function() {

    var database = firebase.database();

    var products = [];
    var user = {};

    function createButtonElement(text, containerId, className = "button", value) {
        $('#' + containerId).append(`<button class="${className}" value="${value}">${text}</button>`);
    }

    function drawButtonCollection(collection, containerId, className, valuePropertyName) {
        for(const key of Object.keys(collection)) {
            createButtonElement(collection[key].name, containerId, className,
                collection[key][valuePropertyName] || key);
        }
    }

    database.ref('/users/').on('value', function(snapshot) {
        $('#users > button').remove();
        drawButtonCollection(snapshot.val(), "users", "user");
    });

    database.ref('/products/').on('value').then( function(snapshot) {
        drawButtonCollection(snapshot.val(), "itemListing", "item", "memberprice");
        $("#items").hide();
    });

    function createUser(username) {
        var id = Math.floor(Math.random() * (100000 + 1));
        database.ref('/users/' + id).push({
            name: username
        });
    }

    $(".addUser").click(function() {
        createUser($("#newUser").val());
    });

    $("#users").on('click', '.user', function () {
        user = {
            name: $(this).text(),
            id: $(this).attr('value')
        }
        $("#customer").text(user.name);
        $(".buy").attr('value', user.id);
        $("#items").show();
        $("#users").hide();
    });

    function redrawCartTotals() {
        $("#products").text(products.reduce(function(text, product) {
            return text + product.name + ", ";
        }, ""));

        $("#price").text(products.reduce(function(sum, product) {
            return sum + product.value;
        }, 0));
    }


    $("#itemListing").on('click', '.item', function() {
        products.push({name: $(this).text(), value: parseFloat($(this)[0].value)});
        redrawCartTotals();
    });

    $(".undo").on('click', function() {
       products.pop();
       redrawCartTotals();
    });

    function emptyCart() {
        products = [];
        user = {};
        redrawCartTotals();
        $("#customer").text("");
        $("#items").hide();
        $("#users").show();
    }

    $(".back").click(function() {
        emptyCart();
    });

    $(".buy").click(function () {
        database.ref('/transactions/').push({
            user: user,
            products: products,
            totalCost: products.reduce(function(sum, product) {
                return sum + product.value;
            }, 0)
        });
        emptyCart();
    })

}());
