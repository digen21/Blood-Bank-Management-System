const mongoose = require("mongoose");
require("dotenv").config({
  path: "./.env",
});
const url = process.env.MONGO_URI;
console.log("mongon uri", url);
(async () => {
  mongoose.connect(url);

  const db = mongoose.connection;
  db.on("error", () => {
    console.error("Error In Database Connectivity");
  });

  db.once("open", async () => {
    console.log("Connected Successfully");

    const bg = require("./models/donor/bloodgroup");
    const donation = require("./models/donor/donation");
    console.log("ada", donation);
    const b = await donation.aggregate([
      {
        $match: {
          bloodgroup: {
            $in: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"], //Matching The Multiple Fields(Blood Types)
          },
        },
      },

      {
        $group: {
          _id: "$bloodgroup",
          total: {
            $sum: "$ml", // Sum Of The Multiple Fields
          },
        },
      },
      { $sort: { _id: 1 } }, //Sorting
    ]);

    const bloodGroups = {
      "A+": b[0].total,
      "A-": b[1].total,
      "AB+": b[2].total,
      "AB-": b[3].total,
      "B+": b[4].total,
      "B-": b[5].total,
      "O+": b[6].total,
      "O-": b[7].total,
    };
    console.log(bloodGroups);

    for (group in bloodGroups) {
      const ml = bloodGroups[group];
      console.log(group, ml);

      await new bg({
        bloodgroup: group,
        totalml: ml,
      }).save();
    }
  });
})();
