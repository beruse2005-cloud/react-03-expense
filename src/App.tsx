import { type ChangeEvent, type SubmitEvent, useState } from "react";
import GlobalStyle from "./GlobalStyle.ts";
import styled from "styled-components";

// 가계부 내역 아이템 타입 정의
type RecordItem = {
    type: string;
    title: string;
    amount: number;
};

const Container = styled.div`
    width: 100%;
    max-width: 720px;
    padding: 0 16px;
    color: #1f2937;
`;

const Title = styled.h2`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
`;

const Fieldset = styled.fieldset`
    border: 1px solid #d1d5db;
    border-radius: 10px;
    padding: 16px;
    background-color: white;
`;

const Legend = styled.legend`
    padding: 0 8px;
    font-size: 14px;
    font-weight: 600;
    color: #4b5563;
`;

const Form = styled.form`
    display: flex;
    gap: 8px;
`;

const Select = styled.select`
    height: 40px;
    padding: 0 12px;
    font-size: 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: white;

    &:focus {
        outline: 2px solid #2563eb;
        border-color: #2563eb;
    }
`;

const Input = styled.input`
    height: 40px;
    padding: 0 12px;
    font-size: 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: white;

    &:hover,
    &:focus {
        outline: 2px solid #2563eb;
        border-color: #2563eb;
    }

    & {
        flex: 1;
        min-width: 0;
    }
`;

const AmountInput = styled.input`
    height: 40px;
    padding: 0 12px;
    font-size: 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: white;

    &:hover,
    &:focus {
        outline: 2px solid #2563eb;
        border-color: #2563eb;
    }

    & {
        width: 120px;
    }
`;

const AddButton = styled.button`
    height: 40px;
    padding: 0 20px;
    font-size: 15px;
    font-weight: 600;
    color: white;
    background-color: #2563eb;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #1d4ed8;
    }
`;

const Table = styled.table`
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: white;
    border: 1px solid #d1d5db;

    th,
    td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
    }

    thead {
        background-color: #f3f4f6;
    }

    th {
        font-size: 14px;
        font-weight: 600;
        color: #4b5563;
    }

    tbody tr:hover {
        background-color: #f9fafb;
    }
`;

const Empty = styled.td`
    text-align: center;
    padding: 32px 12px;
    color: #9ca3af;
`;

const Income = styled.td`
    color: #2563eb;
    font-weight: 600;
`;

const Expense = styled.td`
    color: #dc2626;
    font-weight: 600;
`;

const DeleteButton = styled.button`
    padding: 6px 12px;
    font-size: 13px;
    color: #dc2626;
    background-color: white;
    border: 1px solid #fca5a5;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #fef2f2;
    }
`;

const Summary = styled.div`
    margin-top: 20px;
    padding: 16px;
    border-radius: 10px;
    background-color: #f3f4f6;
`;

const SummaryText = styled.h3`
    font-size: 16px;
    font-weight: 500;
    color: #4b5563;
`;

const Balance = styled.h3`
    margin-top: 8px;
    font-size: 22px;
    font-weight: 700;
    color: #111827;
`;

function App() {
    const [type, setType] = useState<string>("expense");
    const [title, setTitle] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    // list에 RecordItem 배열 타입 지정
    const [list, setList] = useState<RecordItem[]>([]);

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleChangeAmount = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    // select 태그에 맞게 ChangeEvent<HTMLSelectElement>로 수정
    const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
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

    // index 매개변수에 number 타입 명시
    const handleDelete = (index: number) => {
        const newList = list.filter((_, i) => i !== index);
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
        <>
            <GlobalStyle />
            <Container>
                <Title>간단 가계부</Title>
                <Fieldset>
                    <Legend>내역 추가</Legend>
                    <Form onSubmit={handleSubmit}>
                        <Select onChange={handleChangeType} value={type}>
                            <option value={"expense"}>지출</option>
                            <option value={"income"}>수입</option>
                        </Select>
                        <Input
                            placeholder={"내용 (예: 점심, 월급)"}
                            onChange={handleChangeTitle}
                            value={title}
                        />
                        <AmountInput
                            placeholder={"금액"}
                            type={"number"}
                            min={0}
                            onChange={handleChangeAmount}
                            value={amount}
                        />
                        <AddButton type={"submit"}>추가</AddButton>
                    </Form>
                </Fieldset>
                <Table>
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
                                <Empty colSpan={4}>등록된 내역이 없습니다.</Empty>
                            </tr>
                        )}
                        {list.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.type === "income" ? "수입" : "지출"}</td>
                                    <td>{item.title}</td>
                                    {/*
                                        item.type이 "income"(수입)인지 확인합니다.
                                        1. 수입인 경우: 초록색(또는 지정된 색상)의 <Income> 컴포넌트를 사용하고 앞에 '+'를 붙여 금액을 표시합니다.
                                        2. 지출인 경우: 빨간색(또는 지정된 색상)의 <Expense> 컴포넌트를 사용하고 앞에 '-'를 붙여 금액을 표시합니다.
                                        마지막으로 toLocaleString()을 사용해 금액에 천 단위 콤마(,)를 적용합니다.
                                    */}
                                    {item.type === "income" ? (
                                        <Income>+{item.amount.toLocaleString()}</Income>
                                    ) : (
                                        <Expense>-{item.amount.toLocaleString()}</Expense>
                                    )}
                                    <td>
                                        <DeleteButton
                                            onClick={() => {
                                                handleDelete(index);
                                            }}>
                                            삭제
                                        </DeleteButton>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                <Summary>
                    <SummaryText>
                        수입 : {totalIncome.toLocaleString()}원 / 지출 :{" "}
                        {totalExpense.toLocaleString()}원
                    </SummaryText>
                    <Balance>잔액 : {balance.toLocaleString()}원</Balance>
                </Summary>
            </Container>
        </>
    );
}

export default App;
