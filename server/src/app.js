const express = require("express");
const app = express();
const connectDB = require("./dbConnection");
const User = require("./schema");
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  try {
    const { date, item, cost, itemBrief } = req.body;
    const user = new User({
      date,
      item,
      cost,
      itemBrief,
    });
    await user.save();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("failed");
  }
});

app.get("/daily-summary", async (req, res) => {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
      console.log('Fetching daily summary from:', oneMonthAgo);
  
      const dailySummary = await User.aggregate([
        {
          $match: {
            date: { $gte: oneMonthAgo },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCost: { $sum: "$cost" },
          },
        },
        { $sort: { _id: -1 } },
      ]);
  
      if (dailySummary.length === 0) {
        console.log('No daily summary data found');
      }
  
      res.json(dailySummary);
    } catch (err) {
      console.error('Error in /daily-summary:', err);
      res.status(500).json({ error: "Failed to fetch daily summary", details: err.message });
    }
  });

app.get("/monthly-summary", async (req, res) => {
  try {
    const monthlySummary = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            item: "$item",
          },
          totalCost: { $sum: "$cost" },
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
          },
          categories: {
            $push: {
              item: "$_id.item",
              totalCost: "$totalCost",
            },
          },
          totalCost: { $sum: "$totalCost" },
        },
      },
      {
        $project: {
          _id: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lte: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          mess: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$categories",
                      as: "cat",
                      cond: { $eq: ["$$cat.item", "mess"] },
                    },
                  },
                  0,
                ],
              },
              { cost: 0 },
            ],
          },
          tiffin: {
            $ifNull:[
                {
                    $arrayElemAt:[
                        {
                            $filter:{
                                input: "$categories",
                                as: "cat",
                                cond: { $eq: ["$$cat.item", "tiffin"]},
                            },
                        },
                        0,
                    ],
                },
                { cost: 0 },
            ]
          },
          junk:{
            $ifNull:[
                {
                    $arrayElemAt:[
                        {
                            $filter:{
                                input: "$categories",
                                as: "cat",
                                cond:{ $eq: ["$$cat.item", "junk"]},
                            },
                        },
                        0,
                    ],
                },
                { cost: 0 },
            ]
          },
            totalCost: 1,
        },
      },
        { $sort: { _id: -1 } },
    ]);
    res.json(monthlySummary);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch monthly summary");
  }
});

app.listen(3000, () => {
  connectDB();
  console.log("server is running");
});
