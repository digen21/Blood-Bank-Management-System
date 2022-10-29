function handleApprove(e) {
    const id = e.getAttribute("data-id");

    if (!id) {
        alert("ID not found")
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: "http://localhost:5000/approve",
            data: JSON.stringify(
                { id }),
            success: function (res) {
                location.reload();
            },
            error: function (error) {
                console.log(error.message);
            },
        });

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
            url: "http://localhost:5000/reject",
            data: JSON.stringify({
                id,

            }),
            success: function (res) {
                location.reload();
                console.log(res);
            },
            error: function (response) {
                console.log(response);
            },
        });


    }

}