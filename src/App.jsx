import {useState} from "react";

function App() {
    const [type, setType] = useState("expense");  // 구분을 담당하는 state
    const [title, setTitle] = useState("");  // 내용을 담당하는 state
    const [amount, setAmount] = useState("");   // 금액을 담당하는 state

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
    }

    const handleChangeType = (event) => {
        setType(event.target.value);
    }

    return (
        <>
            <h2>간단 가계부</h2>
            <fieldset>
                <legend>내역 추가</legend>
                <form>
                    <select
                        // select는 사용자가 option을 선택함으로서
                        // 선택된 option의 value로 select의 value가 '변함'
                        onChange={handleChangeType}
                        value={type}
                    >
                        <option value={"expense"}>지출</option>
                        <option value={"income"}>수입</option>
                    </select>
                    <input
                        placeholder={"내용 (예: 점심, 월급)"}
                        onChange={handleChangeTitle}
                        value={title}
                    />
                    <input
                        placeholder={"금액"}
                        type={"number"}
                        min={0}
                        onChange={handleChangeAmount}
                        value={amount}
                    />
                    <button type={"submit"}>추가</button>
                </form>
            </fieldset>
            <table
                border={1}
                cellPadding={10}
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "16px"
                }}>
                <thead style={{backgroundColor: "#f2f2f2"}}>
                <tr>
                    <th>구분</th>
                    <th>내용</th>
                    <th>금액</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>지출</td>
                    <td>커피</td>
                    <td>-2000원</td>
                    <td>
                        <button>삭제</button>
                    </td>
                </tr>
                </tbody>
            </table>

            <h3>수입 : 0원 / 지출 : 0원</h3>
            <h3>잔액 : 0원</h3>
        </>
    );
}

export default App;