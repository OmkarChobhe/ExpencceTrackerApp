import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransactions }) => {
  //categories

  const categories = [
    "salary",
    "tip",
    "freeLance",
    "food",
    "movie",
    "bills",
    "medical",
    "fees",
    "grocery",
    "shopping",
    "travel",
    "other",
  ];

  // total transaction
  const totalTransaction = allTransactions.length;
  const totalIncomeTransaction = allTransactions.filter(
    (transaction) => transaction.type === "income"
  ).length;
  const totalExpenseTransaction = allTransactions.filter(
    (transaction) => transaction.type === "expense"
  ).length;
  const totalIncomePercent = (totalIncomeTransaction / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction / totalTransaction) * 100;

  //total turnover
  const totalTurnover = allTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomeTurnover = allTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    totalTurnover === 0 ? 0 : (totalIncomeTurnover / totalTurnover) * 100;

  const totalExpenseTurnoverPercent =
    totalTurnover === 0 ? 0 : (totalExpenseTurnover / totalTurnover) * 100;

    //total turnover
  const remainingAmount = totalIncomeTurnover - totalExpenseTurnover;



  return (
    <>
      <div
        className="row d-flex justify-content-center pt-1 px-4"
        style={{ overflowY: "auto", height: "62vh" }}
      >
        <div className="col-12 col-sm-8 col-md-3 mb-4">
          <div className="card bx-sd4 " style={{ height: "56vh" }}>
            <div className="card-header">
              <h4 className="card-title d-flex">
                Total Transactions:{" "}
                <h5 className="text-primary d-flex mt-1 mx-3">
                  {totalTransaction}
                </h5>
              </h4>
            </div>
            <div className="card-body mt-5">
              <div className="d-flex justify-content-between">
                <Progress
                  type="circle"
                  strokeColor={"lime"}
                  percent={totalIncomePercent.toFixed(0)}
                  status="active"
                  className="mx-2"
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  percent={totalExpensePercent.toFixed(0)}
                  status="active"
                  className="mx-2"
                />
              </div>
              <div className="d-flex justify-content-around me-2 mt-5">
                <h6 className="card-text ">
                  <span className="text-success "> Income:</span>{" "}
                  {totalIncomeTransaction}
                </h6>
                <h6 className="card-text ">
                  <span className="text-danger"> Expense: </span>{" "}
                  {totalExpenseTransaction}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-8  col-md-3 mb-4">
          <div className="card bx-sd4" style={{ height: "56vh" }}>
            <div className="card-header ">
              {/* <h4 className="card-title d-flex ">
                Total TurnOver:{" "}
                <h5 className="text-primary d-flex mt-1 mx-3">
                  ₹{totalTurnover}
                </h5>
              </h4> */}
                  <h4 className="card-title d-flex ">
                Total Amount:{" "}
                <h5 className="text-primary d-flex mt-1 mx-3">
                  ₹{remainingAmount}
                </h5>
              </h4>
            </div>
            <div className="card-body mt-5">
              <div className="d-flex justify-content-between ">
                <Progress
                  type="circle"
                  strokeColor={"lime"}
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                  status="active"
                  className="mx-2 "
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                  status="active"
                  className="mx-2"
                />
              </div>
              <div className="d-flex justify-content-between mt-5">
                <h6 className="card-text ">
                  <span className="text-success"> Income:</span> ₹
                  {totalIncomeTurnover}
                </h6>
                <h6 className="card-text ">
                  <span className="text-danger"> Expense: </span> ₹
                  {totalExpenseTurnover}
                </h6>
              </div>
             
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-8 col-md-3 mb-4">
          <div className=" d-flex justify-content-center mb-3">
            <h4>Category Wise Income</h4>
          </div>

          {categories.map((category) => {
            const amount = allTransactions
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card mb-1">
                  <div className="card-body p-2 d-flex justify-content-between  align-items-center bx-sd4">
                    <h6 className="text-capitalize">{category}</h6>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                      style={{ width: "70%" }}
                      strokeColor={"lime"}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>

        <div className="col-12 col-sm-8 col-md-3 ">
          <div className="d-flex justify-content-center mb-3">
            <h4>Category Wise Expense</h4>
          </div>
          {categories.map((category) => {
            const amount = allTransactions
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card mb-1">
                  <div className="card-body p-2 d-flex justify-content-between align-items-center  bx-sd4">
                    <h6 className="text-capitalize">{category}</h6>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                      style={{ width: "70%" }}
                      strokeColor={"red"}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
