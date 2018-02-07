// Input, Interaction, and Accessibility. Spring 2018, Assignment 1


/* TAB CONTROL */


//Hide all but the default tab and change tab colors
$(document).ready(function() { //do this when the document is loaded
    $("#dialerContent").show(); //show the HTML element with ID "dialer"
    $("#contactsContent").hide(); //hide the element with ID "contacts"
    $("#addContent").hide(); //hide the element with ID "add"
    $("#gesturesContent").hide();

    listContacts();
});


//When the dialer button is clicked, hide the contacts and add contact tabs
$("#dialer").click(function() { //when "dialer" is clicked
    $("#dialerContent").show(); //show dial element
    $("#contactsContent").hide(); //hide other elements
    $("#addContent").hide();
    $("#gesturesContent").hide();
});

//When the contacts button is clicked, hide the dialer and add contact tabs
$("#contacts").click(function() { //when "contacts" is clicked
    $("#dialerContent").hide();
    $("#contactsContent").show();
    $("#addContent").hide();
    $("#gesturesContent").hide();
});

//When the add contact button is clicked, hide the contacts and dialer tabs
$("#add").click(function() { //when "add contacts" is clicked
    $("#dialerContent").hide(); //hide dial element
    $("#contactsContent").hide();
    $("#addContent").show();
    $("#gesturesContent").hide();


});

//When the gestures button is clicked, hide all other tabs
$("#gestures").click(function() { //when "contacts" is clicked
    $("#dialerContent").hide();
    $("#contactsContent").hide();
    $("#addContent").hide();
    $("#gesturesContent").show();
});



/* DIALER BUTTON CONTROL */
//When button is pressed, perform relevant action on dialer text input field
function inputNum(element){
    $("#dialer-box").val($("#dialer-box").val()+element.value);
}



/*https://stackoverflow.com/questions/20060915/javascript-how-do-you-set-the-value-of-a-button-with-an-element-from-an-array referenced to make this function */
function listContacts(){
    //Generate a list of contacts
    //list of names generated at listofrandomnames.com
    var contacts = ["Archie Reeb", "Marc Flavell", "Kasey Burr", "Katharyn Lanford", "Sharilyn Krohn", "Eda Brinkmann", "Neida Stlouis", "Ranee Maltby", "Tod Bottomley","Margit Mazzola"];
    $("#contactsContent").html("<strong style='font-size: 150%'>Contact List</strong>")
    for(var i=0; i<contacts.length; i++){
        $("#contactsContent").append("<div>");
        $("#contactsContent").append("<button class='contactsList pure-button'>"+contacts[i]+ "</button>");
        $("#contactsContent").append("</div>");
    }
};


/*UI EVENTS ON GESTURES TAB*/
var downX = 0;
var downY = 0;

//mouse down
$("#gestureBox").mousedown(function(event) {
    $("#gesture-output").val("Mouse Down");
    downX = event.pageX;
    downY = event.pageY;
});
//mouse up, swipe motions
$("#gestureBox").mouseup(function(event) {

    var diffX = event.pageX - downX;
    var diffY = event.pageY - downY;
    //clear text box
    $("#gesture-output").val("");

    //mouse up
    if ((Math.abs(diffX) < 5) && (Math.abs(diffY) < 5))
        $("#gesture-output").val("Mouse Up");
    //swipe gestures
    else{
        if (diffX > 5)
            $("#gesture-output").val("Swipe Right");
        else if (diffX < -5)
            $("#gesture-output").val("Swipe Left");

        if ((Math.abs(diffX)>5 && Math.abs(diffY)>5))
            $("#gesture-output").val($("#gesture-output").val()+" and ");

        if (diffY < -5)
            $("#gesture-output").val($("#gesture-output").val()+"Swipe Up");
        else if (diffY > 5)
            $("#gesture-output").val($("#gesture-output").val()+"Swipe Down");

    }

});

/*SWITCH TABS WITH KEYBOARD*/
// reference: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented)
        return;

    switch (event.key) {
    case "ArrowLeft":
        switchTabs("left")
        return;
    case "ArrowRight":
        switchTabs("right");
        return;
    default:
        return;
    }
});

function switchTabs (direction) {
    var tab = ["#dialerContent", "#contactsContent", "#addContent", "#gesturesContent"];

    //change active tab
    for (var i=0; i < tab.length; i++){
        if ($(tab[i]).is(':visible')){
            if (direction == "left"){
                if (i == 0)
                    $(tab[tab.length-1]).show();
                else
                    $(tab[i-1]).show();
            }
            else if (direction == "right"){
                if (i == (tab.length-1))
                    $(tab[0]).show();
                else
                    $(tab[i+1]).show();
            }
            $(tab[i]).hide();
            return;
        }
    }
}
