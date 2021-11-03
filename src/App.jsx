import React from "react";
import Header from "./Header";

import Title from "./components/Title";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";

import { GlobalProvider } from "./context/GlobalState";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <GlobalProvider>
                    <Title />
                    <div className="container">
                        <Balance />
                        <IncomeExpenses />
                        <TransactionList />
                        <AddTransaction />
                    </div>
                </GlobalProvider>
            </div>
        );
    }
}
