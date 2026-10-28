import { useState } from "react";
import styles from "./App.module.css";

function App() {
    const [type, setType] = useState("expense");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [list, setList] = useState([]);

    const handleChangeTitle = event => {
        setTitle(event.target.value);
    };

    const handleChangeAmount = event => {
        setAmount(event.target.value);
    };

    const handleChangeType = event => {
        setType(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const parseAmount = Number(amount);
        const parseTitle = title.trim();

        if (parseAmount <= 0 || parseTitle === "") {
            return;
        }

        const newRecord = {
            type: type,
            title: title,
            amount: parseAmount,
        };

        setList([...list, newRecord]);

        setType("expense");
        setTitle("");
        setAmount("");
    };

    const handleDelete = index => {
        const newList = list.filter((item, i) => i !== index);
        setList(newList);
    };

    const totalIncome = list.reduce((sum, item) => {
        return item.type === "income" ? sum + item.amount : sum;
    }, 0);

    const totalExpense = list.reduce((sum, item) => {
        return item.type === "expense" ? sum + item.amount : sum;
    }, 0);

    const balance = totalIncome - totalExpense;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>간단 가계부</h2>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>내역 추가</legend>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <select className={styles.select} onChange={handleChangeType} value={type}>
                        <option value={"expense"}>지출</option>
                        <option value={"income"}>수입</option>
                    </select>
                    <input
                        className={styles.input}
                        placeholder={"내용 (예: 점심, 월급)"}
                        onChange={handleChangeTitle}
                        value={title}
                    />
                    <input
                        className={styles.amountInput}
                        placeholder={"금액"}
                        type={"number"}
                        min={0}
                        onChange={handleChangeAmount}
                        value={amount}
                    />
                    <button type={"submit"} className={styles.addButton}>
                        추가
                    </button>
                </form>
            </fieldset>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>내용</th>
                        <th>금액</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {list.length === 0 && (
                        <tr>
                            <td colSpan={4} className={styles.empty}>
                                등록된 내역이 없습니다.
                            </td>
                        </tr>
                    )}
                    {list.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.type === "income" ? "수입" : "지출"}</td>
                                <td>{item.title}</td>
                                <td
                                    className={
                                        item.type === "income" ? styles.income : styles.expense
                                    }>
                                    {item.type === "income" ? "+" : "-"}
                                    {item.amount.toLocaleString()}
                                </td>
                                <td>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => {
                                            handleDelete(index);
                                        }}>
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className={styles.summary}>
                <h3 className={styles.summaryText}>
                    수입 : {totalIncome.toLocaleString()}원 / 지출 : {totalExpense.toLocaleString()}
                    원
                </h3>
                <h3 className={styles.balance}>잔액 : {balance.toLocaleString()}원</h3>
            </div>
        </div>
    );
}

export default App;