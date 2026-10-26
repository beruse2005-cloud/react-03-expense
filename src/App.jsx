import {useState} from "react";

function App() {
    // 화면에 대한 설계를 진행할 때
    // 목록(array)을 이루는 데이터 개념은 각각의 '항목'이라고 볼 수 있으며
    // '항목'이라는 데이터 개념은 3가지(구분, 내용, 금액)이 모여서 이루어지는 개념임
    // 그에 따라 이 '항목'을 표현할 수 있는 자바스크립트 타입은 '객체'이고,
    // '구분, 내용, 금액' 은 '항목' 객체의 프로퍼티라고 할 수 있다.

    // 사용자에게 입력받아야 되는 정보는 '구분, 내용, 금액' 3가지 이고,
    // 각각의 프로퍼티들은 별개의 input이나 select로 받아야 되며
    // 사용자가 입력한 값은 또다시 별개의 state로 관리한다.

    const [type, setType] = useState("expense");  // 구분을 담당하는 state
    const [title, setTitle] = useState("");  // 내용을 담당하는 state
    const [amount, setAmount] = useState("");   // 금액을 담당하는 state
    // 금액은 숫자잖아요? 왜 0이 아니죠?
    // 화면에 사용되는 input은 등록된 값을 무조건 string으로 돌려줌
    // 그래서 우리는 저 값을 사용을 할 때 string을 number로 변환해서 사용해야 함
    return (
        <>
            <h2>간단 가계부</h2>
            <fieldset>
                <legend>내역 추가</legend>
                <form>
                    <select>
                        {/*
                            select 태그를 통해 사용자가 정해진 값들 중에 선택해서
                            값을 고를 수 있게 할 수 있으며,
                            고를 수 있는 항목은 option 태그를 통해 제공
                            사용자에게는 태그 안의 내용으로만 보여지게 되며
                            실제 전달되는 값은 value 속성으로 지정된 속성값이 전달됨
                        */}
                        <option value={"expense"}>지출</option>
                        <option value={"income"}>수입</option>
                    </select>
                    <input placeholder={"내용 (예: 점심, 월급)"}/>
                    <input
                        placeholder={"금액"}
                        type={"number"}
                        min={0}
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
                    <td><button>삭제</button></td>
                </tr>
                </tbody>
            </table>

            <h3>수입 : 0원 / 지출 : 0원</h3>
            <h3>잔액 : 0원</h3>
        </>
    );
}

export default App;