import {useState} from "react";

function App() {
    const [type, setType] = useState("expense");  // 구분을 담당하는 state
    const [title, setTitle] = useState("");  // 내용을 담당하는 state
    const [amount, setAmount] = useState("");   // 금액을 담당하는 state
    const [list, setList] = useState([]);

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
    }

    const handleChangeType = (event) => {
        setType(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // 입력된 3개의 state를 통해 list에 저장할 객체를 만들어야 함
        // 객체의 프로퍼티는 key: value 의 꼴이고
        // key자리에 쓴건 string으로 자바스크립트가 판단하고
        // value자리에 쓴건 변수로 판단

        // list에 저장을 하기 전에,
        // '저장을 하지 말아야 될 조건' 탐색을 미리 진행해줘야 됨

        // 저장을 하지 말아야 할 조건 1
        // 숫자가 정상적이어야 함. => 입력된 숫자가 + 값이어야 함

        // 저장을 하지 말아야 할 조건 2
        // 'title에 글자가 있어야함'을 체크하기 위해
        // string 타입의 변수에 trim() 메서드를 쓸 수 있음. 매개변수 없음.
        // trim() 메서드 : string의 앞과 뒤에 띄어쓰기가 있다면 그 공백을 삭제해주는 메서드

        const parseAmount = Number(amount);
        const parseTitle = title.trim();

        if (parseAmount <= 0 || parseTitle === "") {
            return;
        }

        const newRecord = {
            type: type,
            title: title,
            // amount(금액)은 input에서 들어올 때 string으로 들어옴
            // 이걸 우리는 number 타입으로 변환해서 저장해야 함
            amount: parseAmount,
        };

        setList([...list, newRecord]);

        setType("expense");
        setTitle("");
        setAmount("");
    }

    return (
        <>
            <h2>간단 가계부</h2>
            <fieldset>
                <legend>내역 추가</legend>
                <form onSubmit={handleSubmit}>
                    <select
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