
//For Patient
function handleApprove(e) {
    const id = e.getAttribute("data-id");
    if (!id) {
        alert("ID not found")
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: "http://localhost:5000/papprove",
            data: JSON.stringify(
                { id }),
            success: function (res) {
                console.log(res.message);
            },
            error: function (error) {
                console.log(error.message);
            },
        });
        location.reload();
    }
}


function handleReject(e) {

    const id = e.getAttribute("data-id");
    if (!id) {
        alert("ID not found")
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: "http://localhost:5000/preject",
            data: JSON.stringify({
                id,

            }),
            success: function (res) {
                console.log(res);
            },
            error: function (response) {
                console.log(response);
            },
        });
        location.reload();
    }

}