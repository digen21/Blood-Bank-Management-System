function download(e) {
    const id = e.getAttribute("data-id");
    console.log(id);

    if (!id) {
        alert("ID not found")
    } else {
        $.ajax({
            type: "GET",
            url: `http://localhost:5000/generate_invoice/${id}`,
            success: function (res) {
                console.log(res.message);
                // window.location.replace(`http://localhost:5000/generate_invoice/${id}`);
            },
            error: function (error) {
                console.log(error);
            },
        });


    }
}