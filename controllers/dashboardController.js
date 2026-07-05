import Expense from "../models/Expense.js";


// ===============================
// Total Income
// ===============================

async function getTotalIncome(userId) {
  const result = await Expense.aggregate([
    {
      $match: {
        user: userId,
        type: "income",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  return result[0]?.total || 0;
}


// ===============================
// Total Expense
// ===============================

async function getTotalExpense(userId) {
  const result = await Expense.aggregate([
    {
      $match: {
        user: userId,
        type: "expense",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  return result[0]?.total || 0;
}


// ===============================
// Balance
// ===============================

async function getBalance(userId) {

  const [income, expense] = await Promise.all([
    getTotalIncome(userId),
    getTotalExpense(userId),
  ]);

  return income - expense;
}



// ===============================
// Category Breakdown
// ===============================

async function getCategoryBreakdown(userId) {
  return await Expense.aggregate([
    {
      $match: {
        user: userId,
        type: "expense",
      },
    },
    {
      $group: {
        _id: "$category",
        amount: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        amount: -1,
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        amount: 1,
      },
    },
  ]);
}



// ===============================
// Monthly Summary
// ===============================

async function getMonthlySummary(userId) {

  return await Expense.aggregate([
    {
      $match: {
        user: userId,
      },
    },

    {
      $group: {
        _id: {
          year: {
            $year: "$date",
          },

          month: {
            $month: "$date",
          },

          type: "$type",
        },

        total: {
          $sum: "$amount",
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);
}



// ===============================
// Recent Transactions
// ===============================

async function getRecentTransactions(userId) {

  return await Expense.find({
    user: userId,
  })
    .sort({
      date: -1,
    })
    .limit(5);
}




// ===============================
// Dashboard Controller
// ===============================

export const getDashboard = async (req, res) => {
    console.log(' start the dashboard route')

  try {

    const userId = req.user.id;

    const [
      totalIncome,
      totalExpense,
      balance,
      categoryBreakdown,
      monthlySummary,
      recentTransactions,
    ] = await Promise.all([
      getTotalIncome(userId),
      getTotalExpense(userId),
      getBalance(userId),
      getCategoryBreakdown(userId),
      getMonthlySummary(userId),
      getRecentTransactions(userId),
    ]);


    res.status(200).json({

      success: true,

      data: {

        totalIncome,

        totalExpense,

        balance,

        categoryBreakdown,

        monthlySummary,

        recentTransactions,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Internal Server Error",

    });

  }

};