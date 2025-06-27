import React from 'react';
import { Flex, Progress } from "antd";

const Analytics = ({ allTransections }) => {
  const totalTrnasection = allTransections.length;
  const totalIncomeTransection = allTransections.filter(transaction => transaction.type === 'income');
  const totalExpenseTransection = allTransections.filter(transaction => transaction.type === 'expense');
  const totalIncomePercent = (totalIncomeTransection.length / totalTrnasection) * 100;
  const totalExpensePercent = (totalExpenseTransection.length / totalTrnasection) * 100;
  const categories = ['salary', 'tip', 'project', 'food', 'bills', 'emi'];

  const totalTurnover = allTransections.reduce(
    (acc, transaction) => acc + transaction.amount, 0
  );
  const totalIncomeTurnover = allTransections
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransections
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverpercent = (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverpercent = (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* Total Transactions Card */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-header">
              Total Transactions: {totalTrnasection}
            </div>
            <div className="card-body">
              <h6 className="text-success">Income: {totalIncomeTransection.length}</h6>
              <h6 className="text-danger">Expense: {totalExpenseTransection.length}</h6>
              <Flex gap="small" wrap className="mt-3">
                <Progress type="circle" strokeColor="green" percent={totalIncomePercent.toFixed(0)} />
                <Progress type="circle" strokeColor="red" percent={totalExpensePercent.toFixed(0)} />
              </Flex>
            </div>
          </div>
        </div>

        {/* Total Turnover Card */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-header">
              Total Turnover: ₹{totalTurnover}
            </div>
            <div className="card-body">
              <h6 className="text-success">Income: ₹{totalIncomeTurnover}</h6>
              <h6 className="text-danger">Expense: ₹{totalExpenseTurnover}</h6>
              <Flex gap="small" wrap className="mt-3">
                <Progress type="circle" strokeColor="green" percent={totalIncomeTurnoverpercent.toFixed(0)} />
                <Progress type="circle" strokeColor="red" percent={totalExpenseTurnoverpercent.toFixed(0)} />
              </Flex>
            </div>
          </div>
        </div>

        {/* Category-wise Income */}
        <div className="col-12 col-lg-3">
          <h5 className="mb-3">Category-wise Income</h5>
          {
            categories.map(category => {
              const amount = allTransections
                .filter(t => t.type === 'income' && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);

              return (
                amount > 0 && (
                  <div className="card mb-2" key={category}>
                    <div className="card-body">
                      <strong>{category}</strong>
                      <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                    </div>
                  </div>
                )
              );
            })
          }
        </div>

        {/* Category-wise Expense */}
        <div className="col-12 col-lg-3">
          <h5 className="mb-3">Category-wise Expense</h5>
          {
            categories.map(category => {
              const amount = allTransections
                .filter(t => t.type === 'expense' && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);

              return (
                amount > 0 && (
                  <div className="card mb-2" key={category}>
                    <div className="card-body">
                      <strong>{category}</strong>
                      <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                    </div>
                  </div>
                )
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Analytics;
